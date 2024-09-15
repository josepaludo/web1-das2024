import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { ComponentType, useState } from 'react'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
}

type Props = {
    Component: ComponentType<{ onClick: () => void}>
    title: string
    description: string
    confirm: string
    cancel: string
    onConfirm: () => void
}

export default function AppModal({ Component, confirm, cancel, description, title, onConfirm }: Props) {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return <>
        <Component onClick={handleOpen} />
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={style}
                className="flex flex-col gap-6"
            >
                <Typography variant="h6">
                    { title }
                </Typography>
                <Typography variant='body1'>
                    { description }
                </Typography>
                <div className='grid grid-cols-2 gap-2'>
                    <Button onClick={handleClose}>
                        { cancel }
                    </Button>
                    <Button
                        onClick={() => {
                            handleClose()
                            onConfirm()
                        }}
                        variant='contained'
                        disableElevation
                    >
                        { confirm }
                    </Button>
                </div>
            </Box>
        </Modal>
    </>
}
