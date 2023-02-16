import Form from '@components/organisms/Form'
import FormButton from '@components/atoms/FormButton'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { PostsContext } from '@components/templates/Context';
import { createPost, setPost } from '@/api/APIConsume'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import PageLayout from '../components/templates/PageLayout'

function PostForm(){
    const {
        control,
        setValue,
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
            label: 'Post Title',
            className: 'form__input',
            validations: {
                required: true,
                maxLength: 100
            }
        },
        {
            id: 'body',
            type: 'text',
            label: 'Post Body',
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

    const errorMsg = (error) => {
        let msg = ''
        const field = error?.ref.name

        if (error?.type === 'required') {
            msg = `${field[0].toUpperCase() + field.substring(1)} is a required field.`
        }
        if (error?.type === 'maxLength'){
            const input = formInputs.find(input => input.id === field)

            msg = `${field[0].toUpperCase() + field.substring(1)} cannot exceed ${input.validations.maxLength} characters`
        }

        return msg
    }

    return(
        <PageLayout
            title={'Form'}
            subtitle={'Posts Form'}
        >
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
            <Controller 
                key={formInputs[0].id}
                name={formInputs[0].id}
                control={control}
                rules={formInputs[0].validations}
                render={
                    ({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField 
                            onChange={onChange}
                            value={value}
                            label={formInputs[0].label}
                            error={!!error}
                            helperText={errorMsg(error)}
                            InputLabelProps={{shrink: true}}
                            variant='filled'
                        />
                    )
                }
            />
            <Controller 
                key={formInputs[1].id}
                name={formInputs[1].id}
                control={control}
                rules={formInputs[1].validations}
                render={
                    ({field: {onChange, value}, fieldState: {error}}) => (
                        <TextField 
                            onChange={onChange}
                            value={value}
                            label={formInputs[1].label}
                            error={!!error}
                            helperText={errorMsg(error)}
                            InputLabelProps={{shrink: true}}
                            variant='filled'
                            multiline
                        />
                    )
                }
            />
        </Form>
        </PageLayout>
    )
}

export default PostForm;