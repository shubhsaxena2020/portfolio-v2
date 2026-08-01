import bpy
import math
import os

ROOT = r"C:\Users\shubh\Projects\portfolio-v2"
IN_GLB = os.path.join(ROOT, "public", "assets", "3d", "shubh-bust-final.glb")
OUT_GLB = os.path.join(ROOT, "public", "assets", "3d", "shubh-bust-final-recleaned.glb")
PREVIEW_PNG = os.path.join(ROOT, "assets", "source", "blender-preview.png")

# clear default scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# import the generated GLB
bpy.ops.import_scene.gltf(filepath=IN_GLB)

mesh_objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
print(f"Imported {len(mesh_objs)} mesh object(s)")

for obj in mesh_objs:
    bpy.context.view_layer.objects.active = obj
    obj.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT')
    bpy.ops.mesh.select_all(action='SELECT')
    bpy.ops.mesh.remove_doubles(threshold=0.0001)
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.object.mode_set(mode='OBJECT')

    # no decimation this pass — maximum detail requested, file size is not a constraint
    obj.select_set(False)
    print(f"Cleaned {obj.name}: {len(obj.data.vertices)} verts, {len(obj.data.polygons)} faces")

# set up a simple camera + light for a front preview render
cam_data = bpy.data.cameras.new("PreviewCam")
cam_obj = bpy.data.objects.new("PreviewCam", cam_data)
bpy.context.scene.collection.objects.link(cam_obj)
bpy.context.scene.camera = cam_obj

# frame the bust: find combined bounding box
import mathutils
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

cam_obj.location = (center.x, center.y + radius * 2.2, center.z + size.z * 0.1)
direction = center - cam_obj.location
cam_obj.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
cam_data.lens = 50

def add_sun(name, loc, energy, color=(1.0, 1.0, 1.0)):
    ld = bpy.data.lights.new(name, type='SUN')
    ld.energy = energy
    ld.color = color
    lo = bpy.data.objects.new(name, ld)
    lo.location = loc
    direction = center - lo.location
    lo.rotation_euler = direction.to_track_quat('-Z', 'Y').to_euler()
    bpy.context.scene.collection.objects.link(lo)
    return lo

# warmer key light + softer fill, closer to the painted reference's warm studio mood
add_sun("KeyLight", (center.x - radius, center.y + radius * 2.5, center.z + radius * 1.5), 3.2, (1.0, 0.94, 0.85))
add_sun("FillLight", (center.x + radius * 1.5, center.y + radius * 2, center.z), 1.8, (1.0, 0.97, 0.92))
add_sun("RimLight", (center.x, center.y - radius, center.z + radius), 1.0)

scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE'
scene.render.resolution_x = 800
scene.render.resolution_y = 800
scene.render.filepath = PREVIEW_PNG
bpy.ops.render.render(write_still=True)
print(f"Rendered preview to {PREVIEW_PNG}")

# export cleaned GLB
bpy.ops.export_scene.gltf(filepath=OUT_GLB, export_format='GLB')
print(f"Exported cleaned GLB to {OUT_GLB}")
