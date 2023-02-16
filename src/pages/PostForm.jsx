import Form from '@components/organisms/Form'
import FormButton from '@components/atoms/FormButton'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { PostsContext } from '@components/templates/Context';
import { createPost, setPost } from '@/api/APIConsume'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import PageLayout from '../components/templates/PageLayout'
import ModalComponent from '@components/atoms/ModalComponent'

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
        setPosts,
        postsDeleted
    } = useContext(PostsContext);
    const [modalData, setModalData] = useState({
        modalOpen: false,
        modalTitle:'',
        modalSubtitle:''
    })
    const {
        modalOpen,
        modalTitle,
        modalSubtitle
    } = modalData;

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
                setModalData({
                    modalOpen: true,
                    modalTitle: 'Post updated!',
                    modalSubtitle: `#${post.id}: ${postContent.title.toUpperCase()}`
                })
                // navigate('/');
            }
        } else {
            try {
                const newPost = await createPost(postContent)
                
                setPosts([
                    {
                        ...newPost.data,
                        id: posts.length + postsDeleted + 1
                    },
                    ...posts
                ])
                setModalData({
                    modalOpen: true,
                    modalTitle: 'Post created!',
                    modalSubtitle: `#${posts.length + postsDeleted + 1}: ${postContent.title.toUpperCase()}`
                })
                // navigate('/');
            } catch(e){
                console.error(`Error during post creation: ${e}`)
            }
        }

    }
    const onReturnToDashboard = () => {
        navigate('/')
    }
    const onCreatePostAgain = () => {
        setModalData({
            modalOpen: false,
            modalTitle:'',
            modalSubtitle:''
        })
        formInputs.map(entry => setValue(entry.id, ''))
    }

    const formButtons = [
        {
            id: 'cancelButton',
            type: 'button',
            className: 'secondary',
            label: 'Cancel',
            onClickAction: onReturnToDashboard
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
                defaultValue={''}
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
                defaultValue={''}
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
        <ModalComponent
            isOpen={modalOpen}
            title={modalTitle}
            subtitle={modalSubtitle}
            buttons={
                <>
                    {
                        !idPost && 
                        <FormButton 
                            id={'modal-createAgain'}
                            type={'button'}
                            label={'Create new post'}
                            onClick={onCreatePostAgain}
                        />
                    }
                    <FormButton 
                        id={'modal-continue'}
                        type={'submit'}
                        label={'Continue'}
                        onClick={onReturnToDashboard}
                    />
                </>
            }
        />
        </PageLayout>
    )
}

export default PostForm;