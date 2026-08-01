import bpy
import math
import os
import mathutils

ROOT = r"C:\Users\shubh\Projects\portfolio-v2"
IN_GLB = os.path.join(ROOT, "public", "assets", "3d", "shubh-bust.glb")

bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=IN_GLB)
mesh_objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']

min_co = mathutils.Vector((math.inf, math.inf, math.inf))
max_co = mathutils.Vector((-math.inf, -math.inf, -math.inf))
for obj in mesh_objs:
    for corner in obj.bound_box:
        world_co = obj.matrix_world @ mathutils.Vector(corner)
        min_co = mathutils.Vector(map(min, min_co, world_co))
        max_co = mathutils.Vector(map(max, max_co, world_co))
center = (min_co + max_co) / 2
size = max_co - min_co
radius = max(size.x, size.y, size.z)

# bright, all-around lighting so orientation is unambiguous regardless of direction
for name, loc in [("L1", (radius*3, 0, radius)), ("L2", (-radius*3, 0, radius)),
                   ("L3", (0, radius*3, radius)), ("L4", (0, -radius*3, radius)),
                   ("L5", (0, 0, radius*3))]:
    ld = bpy.data.lights.new(name, type='SUN')
    ld.energy = 2.0
    lo = bpy.data.objects.new(name, ld)
    lo.location = (center.x + loc[0], center.y + loc[1], center.z + loc[2])
    direction = center - lo.location
    lo.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    bpy.context.scene.collection.objects.link(lo)

cam_data = bpy.data.cameras.new("Cam")
cam_obj = bpy.data.objects.new("Cam", cam_data)
bpy.context.scene.collection.objects.link(cam_obj)
bpy.context.scene.camera = cam_obj
cam_data.lens = 50

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 500
scene.render.resolution_y = 500

angles = {
    "posY": (0, radius*2.2, size.z*0.1),
    "negY": (0, -radius*2.2, size.z*0.1),
    "posX": (radius*2.2, 0, size.z*0.1),
    "negX": (-radius*2.2, 0, size.z*0.1),
}
for name, offset in angles.items():
    cam_obj.location = (center.x + offset[0], center.y + offset[1], center.z + offset[2])
    direction = center - cam_obj.location
    cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    scene.render.filepath = os.path.join(ROOT, "assets", "source", f"blender-preview-{name}.png")
    bpy.ops.render.render(write_still=True)
    print(f"rendered {name}")
