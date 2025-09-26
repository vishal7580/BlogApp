import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

const RTE = ({control,currentContent}) => {


  return (
    <div>
    <Controller
        name='content'
        control={control}
        render={({field:{onChange}})=> (
        <Editor

        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}   // use "no-api-key" for testing
        init={{
            
            skin: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oxide-dark' : 'oxide'),
        content_css: (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'),
            plugins: [
            'anchor', 'autolink', 'charmap', 'codesample', 
            'emoticons', 'link', 'lists', 'media', 
            'searchreplace', 'table', 'visualblocks', 'wordcount'
            ],
            toolbar:
            'undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline strikethrough | ' +
            'link media table | ' +
            'align lineheight | checklist numlist bullist indent outdent | ' +
            'emoticons charmap | removeformat',
            menubar: true, // optional: hides the top menubar
        }}
        initialValue={currentContent}
        onEditorChange={onChange}
        />
        )}
        />

    </div>
  )
}

export default RTE