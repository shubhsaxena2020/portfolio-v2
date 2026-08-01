from gradio_client import Client, handle_file

client = Client("multimodalart/Ip-Adapter-FaceID")

face_photo = "assets/source/3d-model-reference-photos/formal-front-01.jpeg"

prompt = (
    "a professional editorial portrait of a young Indian man with short neat dark hair and "
    "thin rectangular glasses, wearing a sharp charcoal gray business suit with a white dress "
    "shirt and a maroon tie, calm confident direct gaze, neutral serious expression, sharp "
    "focus on the face with precise accurate facial features, clean studio portrait lighting, "
    "light gray dotted grid paper background, subtle bold black serif typography faintly "
    "visible in the background, premium high-end corporate headshot quality, semi-realistic "
    "editorial illustration rendering, no exaggerated features"
)

negative_prompt = (
    "lowres, low quality, worst quality, watermark, deformed, ugly, deformed eyes, blurry, "
    "out of focus, monochrome, distorted face, asymmetric face, extra limbs, text errors, "
    "space suit, sci-fi armor, futuristic costume, helmet, forehead mark, bindi, tilak, "
    "casual clothing, t-shirt"
)

result = client.predict(
    [handle_file(face_photo)],
    prompt,
    negative_prompt,
    True,
    1.7,
    1.3,
    "naked, bikini, skimpy, scanty, bare skin, lingerie, swimsuit, exposed, see-through",
    api_name="/generate_image",
)

print(result)
