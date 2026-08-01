from gradio_client import Client, handle_file

client = Client("tonyassi/face-swap")

src_face = "assets/source/3d-model-reference-photos/formal-front-01.jpeg"  # real face
dest_body = "public/assets/hero-candidate-crossed-arms.webp"  # generated suit pose

result = client.predict(
    handle_file(src_face),
    handle_file(dest_body),
    api_name="/swap_faces",
)

print(result)
