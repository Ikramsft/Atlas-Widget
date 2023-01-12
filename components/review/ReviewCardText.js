import StarIcon from '@mui/icons-material/Star';
import { Typography } from '@mui/material';

function ReviewCardText({ text }) {
	return (
		<div >

			<Typography component="p" sx={{ fontSize: "16px", borderBottom: "1px solid #a7a7a747", padding: "5px 0" }} className='d-flex align-items-start mb-1 '>
				<Typography component="span" sx={{ fontSize: "14px", width: "100%", maxWidth: "120px" }} className='mr-2 font-weight-bold ' >{text?.name} : </Typography>
				<Typography component="span" sx={{ fontSize: "14px", width: "100%", maxWidth: "175px" }} className='mr-2'> {text?.header}</Typography>
				<Typography component="span" className='d-flex align-items-center' sx={{ width: "100%", maxWidth: "40px" }}><Typography component="span" sx={{ fontSize: "14px" }}> {text?.rating} </Typography>
					<Typography component="span" ><StarIcon color="#e3b778" sx={{ fill: "#e3b778", width: "15px", height: "15px", maringLeft: "5px", marginBottom: "5px" }} /></Typography></Typography>
				{text?.comment && <Typography component="span" sx={{ fontSize: "14px", maxWidth: "380px", width: "100%", marginLeft: "5px" }} >{text?.comment}</Typography>}
			</Typography>
		</div>
	)
}

export default ReviewCardText