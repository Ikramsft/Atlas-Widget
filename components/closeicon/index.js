import { Box } from '@mui/system'

function CloseIcon({ customeStyle, handleClose }) {
	return (
		<Box className="position-absolute cursor-pointer" sx={customeStyle} onClick={handleClose}><i className='iconsminds-close'></i></Box>
	)
}

export default CloseIcon