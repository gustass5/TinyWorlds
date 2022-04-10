export function UserInterface() {
	function handlePhoto() {
		const canvas = document.querySelector('canvas');

		var dataURL = canvas?.toDataURL();
		console.log({ dataURL });
		var a = document.createElement('a'); //Create <a>
		if (dataURL !== undefined) {
			a.href = dataURL; //Image Base64 Goes here
			a.download = 'Image.png'; //File name Here
			a.click();
		}
	}

	return (
		<div className="absolute w-full bottom-0 h-16 bg-black/10 z-10 flex justify-end items-center">
			<svg
				onClick={handlePhoto}
				className="text-white mx-12 h-12 w-auto hover:text-red-400 transition ease-in-out duration-100 cursor-pointer "
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<path
					className="fill-current"
					d="M5 4h-3v-1h3v1zm10.93 0l.812 1.219c.743 1.115 1.987 1.781 3.328 1.781h1.93v13h-20v-13h3.93c1.341 0 2.585-.666 3.328-1.781l.812-1.219h5.86zm1.07-2h-8l-1.406 2.109c-.371.557-.995.891-1.664.891h-5.93v17h24v-17h-3.93c-.669 0-1.293-.334-1.664-.891l-1.406-2.109zm-11 8c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm7 0c1.654 0 3 1.346 3 3s-1.346 3-3 3-3-1.346-3-3 1.346-3 3-3zm0-2c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5z"
				/>
			</svg>
		</div>
	);
}
