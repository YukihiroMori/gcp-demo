gcloud functions deploy analyzeContents \
  --source https://source.developers.google.com/projects/be-mori-yukihiro/repos/github_yukihiromori_gcp-demo/moveable-aliases/develop/paths//functions/analyze_contents  \
  --runtime nodejs8 \
  --trigger-resource be-mori-yukihiro-demo-input \
  --trigger-event google.storage.object.finalize \