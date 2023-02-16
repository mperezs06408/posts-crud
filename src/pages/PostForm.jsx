import { createPost } from '@/api/APIConsume'
import TextField from '@mui/material/TextField'
import ModalComponent from '@components/atoms/ModalComponent'
import FormButton from '@components/atoms/FormButton'
import Form from '@components/organisms/Form'
import PageLayout from '@components/templates/PageLayout'
import { PostsContext } from '@components/templates/Context';
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { FORM_PAGE as PAGE_DATA } from '@/assets/dictionary'

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
        setPost,
        updatePost,
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

    useEffect(()=> {
        if (idPost) {
            const post = posts.find(post => post.id === parseInt(idPost))
    
            if (post) {
                formInputs.map(entry => setValue(entry.id, post[entry.id]))
            }
        }
    }, [])

    const onSubmit = async (data) => {
        const postContent = {
            title: data.title,
            body: data.body
        }
        if (idPost) {
            const updatePostFromOrigin = updatePost(idPost, postContent)

            if (updatePostFromOrigin) {
                setModalData({
                    modalOpen: true,
                    modalTitle: 'Post updated!',
                    modalSubtitle: `#${idPost}: ${postContent.title.toUpperCase()}`
                })
            } else {
                setModalData({
                    modalOpen: true,
                    modalTitle: 'Something went wrong!',
                    modalSubtitle: `Please try it later.`
                })
            }
            
        } else {
            try {
                /**Emulated POST method */
                const request = await createPost(postContent)
                const newPost = request.data

                const successfulAction = setPost(newPost)
                
                setModalData({
                    modalOpen: true,
                    modalTitle: 'Post created!',
                    modalSubtitle: `#${successfulAction}: ${postContent.title.toUpperCase()}`
                })
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
            validations: {
                required: true,
                maxLength: 100
            }
        },
        {
            id: 'body',
            type: 'text',
            label: 'Post Body',
            validations: {
                required: true,
                maxLength: 2000
            }
        }
    ]

    return(
        <PageLayout
            title={PAGE_DATA.title}
            subtitle={PAGE_DATA.subtitle}
        >
            <Form
            title={idPost ? PAGE_DATA.form_edit_title(idPost) : PAGE_DATA.form_title}
            handleSubmit={handleSubmit(onSubmit)}
            buttons={
                <>
                    {
                        formButtons.map( button => (
                            <FormButton 
                                key={button.id}
                                id={button.id}
                                type={button.type}
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