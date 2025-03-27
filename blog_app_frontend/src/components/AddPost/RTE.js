import { Editor } from "@tinymce/tinymce-react";

export default function RTE({ setContent }) {
  {
    /* NOTE: In the TINY-MCE RTE editor; it was compelling me/the admin to add api keys. See this issue:- */
  }
  {
    /* my api keys {8nm03ok1hrybuha04rprdszsnk7mkhghzm8pyziucah8ih0x} */
  }
  {
    /* Error ehich I was getting: 
      "A valid API key is required to continue using TinyMCE.
      Please alert the admin to check the current API key. 
      Click here to learn more-> [https://www.tiny.cloud/docs/tinymce/latest/invalid-api-key/?utm_campaign=no_api_key_learn_more&utm_source=tiny&utm_medium=referral] "
      What would happen without it? -> Starting in early 2024, all editors on our cloud platform will be required to have a valid API key. Without a valid API key, your editor 
      will transition to read-only mode, limiting your ability to make changes.  */
  }

  return (
    <Editor
      apiKey={process.env.REACT_APP_TINY_MCE_API_KEY}
      // initialValue={defaultValue}
      init={{
        //   initialValue: defaultValue,
        height: "80vh",
        menubar: true,
        placeholder: "Write your content here...",
        plugins: [
          "image",
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "anchor",
        ],
        toolbar:
          "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={(e) => setContent(e)}
    />
  );
}
