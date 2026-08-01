from gradio_client import Client, handle_file

client = Client("stabilityai/stable-fast-3d")

result = client.predict(
    handle_file("assets/source/hero-final-chatgpt-portrait.png"),
    0.85,
    "Triangle",
    20000,
    2048,
    api_name="/run_button",
)

print(result)
