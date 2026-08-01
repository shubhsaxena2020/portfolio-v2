from gradio_client import Client, handle_file

client = Client("InstantX/InstantID")

face_photo = "assets/source/3d-model-reference-photos/formal-front-01.jpeg"

prompt = (
    "a striking semi-realistic painterly digital illustration portrait of a young Indian man "
    "with short neat dark hair and thin rectangular glasses, editorial character art style, "
    "soft painterly brush shading, warm brown skin tone, sharp expressive dark eyes looking "
    "directly at viewer, calm confident expression, wearing a futuristic sci-fi tech collar "
    "exosuit neckpiece in pale mint-green and white armored plating with visible mechanical "
    "seams and thin black cables running toward the neck, light gray dotted grid paper "
    "background, bold oversized black serif typography partially visible behind the character, "
    "premium editorial illustration quality, cinematic front-left lighting"
)

negative_prompt = (
    "lowres, low quality, worst quality, watermark, deformed, ugly, deformed eyes, blurry, "
    "out of focus, monochrome, photo, photorealistic camera artifact, extra limbs, text errors"
)

result = client.predict(
    handle_file(face_photo),
    handle_file(face_photo),
    prompt,
    negative_prompt,
    "(No style)",
    20,
    0.85,
    0.8,
    0.4,
    0.4,
    [],
    5.0,
    42,
    "EulerDiscreteScheduler",
    False,
    True,
    api_name="/generate_image",
)

print(result)
