import Label from '@components/atoms/Label'
import Input from '@components/atoms/Input'
import InputContainer from '@components/molecules/InputContainer'
import Form from '@components/organisms/Form'
import FormButton from '@components/atoms/FormButton'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostsContext } from '@components/templates/Context';
import { createPost, setPost } from '@/api/APIConsume'

function PostForm(){
    const {
        register,
        setValue,
        formState:{ errors },
        handleSubmit
    } = useForm();
    const {
        idPost
    } = useParams();
    const {
        posts,
        setPosts
    } = useContext(PostsContext);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const postContent = {
            title: data.title,
            body: data.body
        }
        if (idPost) {
            console.log('yes')
            try {
                /*Just emulated functionality*/
                const postEdited = await setPost(postContent)
            } catch (e) {
                console.log(`Error retieving a post with ${idPost} Id, maybe it is just available from local app`)
            }
            const post = posts.find(post => post.id === parseInt(idPost))

            if (post) {
                const postIndexOf = posts.indexOf( post )
                const postListCopy = [...posts]
                const newPost = {
                    ...post,
                    ...postContent
                }

                postListCopy[postIndexOf] = newPost

                setPosts(postListCopy)
                navigate('/');
            }
        } else {
            try {
                const newPost = await createPost(postContent)
                
                setPosts([
                    {
                        ...newPost.data,
                        id: posts.length + 1
                    },
                    ...posts
                ])
                navigate('/');
            } catch(e){
                console.error(`Error during post creation: ${e}`)
            }
        }

    }
    const onCancelFormAction = () => {
        navigate('/')
    }

    const formButtons = [
        {
            id: 'cancelButton',
            type: 'button',
            className: 'secondary',
            label: 'Cancel',
            onClickAction: onCancelFormAction
        },
        {
            id: 'submitButton',
            type: 'submit',
            className: 'primary',
            label: 'Submit'
        }
    ]
    const formInputs = [
        {
            id: 'title',
            type: 'text',
            label: 'post title',
            className: 'form__input',
            validations: {
                required: true,
                maxLength: 55
            }
        },
        {
            id: 'body',
            type: 'text',
            label: 'post body',
            className: 'form__input--multiline',
            validations: {
                required: true,
                maxLength: 2000
            }
        }
    ]

    useEffect(()=> {
        if (idPost) {
            const post = posts.find(post => post.id === parseInt(idPost))
    
            if (post) {
                formInputs.map(entry => setValue(entry.id, post[entry.id]))
            }
        }
    }, [])

    return(
        <Form
            title={idPost ? `Edit post #${idPost}` : 'Create a new post'}
            handleSubmit={handleSubmit(onSubmit)}
            buttons={
                <>
                    {
                        formButtons.map( button => (
                            <FormButton 
                                key={button.id}
                                id={button.id}
                                type={button.type}
                                className={button.className}
                                label={button.label}
                                onClick={button?.onClickAction}
                            />
                        ))
                    }
                </>
            }
        >
            {
                formInputs.map( entry => (
                    <InputContainer
                        key={entry.id}
                    >
                        <Label htmlFor={entry.id} label={entry.label} />
                        <Input 
                            id={entry.id}
                            type={entry.type}
                            className={entry.className}
                            
                            refs={{
                                ...register(entry.id, {...entry.validations})
                            }}
                        />
                    </InputContainer>
                ))
            }
        </Form>
    )
}

export default PostForm;