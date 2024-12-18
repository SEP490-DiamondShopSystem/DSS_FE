import React, {useEffect, useState, useRef} from 'react';
import {Button, Input, Modal, Select} from 'antd';
import {SketchPicker} from 'react-color';
import ring from '../../../../../assets/vien nhan.png';
import * as fabric from 'fabric';

const {Option} = Select;

export const Engrave = ({
	setStep,
	setImageData,
	imageData,
	setFontFamily,
	fontFamily,
	setTextValue,
	textValue,
	diamondJewelry,
}) => {
	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [fontSize, setFontSize] = useState(30);
	const [textColor, setTextColor] = useState('#000');
	const [textObject, setTextObject] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [textFont, setTextFont] = useState(fontFamily || 'Lucida Sans');
	const [textContent, setTextContent] = useState('');

	// useEffect(() => {
	// 	const fabricCanvas = new fabric.Canvas(canvasRef.current, {
	// 		width: 500,
	// 		height: 500,
	// 	});
	// 	setCanvas(fabricCanvas);

	// 	const imgElement = new Image();
	// 	imgElement.src = ring;
	// 	imgElement.onload = () => {
	// 		const fabricImg = new fabric.Image(imgElement);
	// 		fabricImg.scaleToWidth(500);
	// 		fabricImg.set({left: 0, top: 80, selectable: false});
	// 		fabricCanvas.add(fabricImg);

	// 		const path = new fabric.Path('M153,242 C172,348 387,366 427,248', {
	// 			fill: '',
	// 			stroke: 'transparent',
	// 		});

	// 		const initialText = new fabric.Text(textContent, {
	// 			fontSize,
	// 			fontFamily: textFont,
	// 			fill: textColor,
	// 			path,
	// 			left: 0,
	// 			top: 0,
	// 			textAlign: 'center',
	// 			originX: 'center',
	// 			originY: 'center',
	// 			selectable: false,
	// 		});

	// 		fabricCanvas.add(path);
	// 		fabricCanvas.add(initialText);
	// 		setTextObject(initialText);
	// 		fabricCanvas.renderAll();
	// 	};

	// 	return () => {
	// 		fabricCanvas.dispose();
	// 	};
	// }, [textContent]);

	useEffect(() => {
		if (textObject && canvas) {
			textObject.set({
				text: textContent,
				fontSize,
				fontFamily: textFont,
				fill: textColor,
				selectable: false,
			});
			textObject.set({
				left: canvas.width / 2,
				top: canvas.height / 2,
				originX: 'center',
				originY: 'center',
			});
			canvas.renderAll();
		}
	}, [textContent, fontSize, textFont, textColor, textObject, canvas]);

	// const handleExportImage = () => {
	// 	if (canvas) {
	// 		setTimeout(() => {
	// 			const dataURL = canvas.toDataURL({
	// 				format: 'png',
	// 				multiplier: 1,
	// 			});
	// 			setImageData(dataURL);
	// 		}, 100);
	// 	}

	// };

	const uploadImage = async () => {
		if (!imageData) return;
		setIsUploading(true);
		try {
			const response = await fetch('YOUR_AZURE_UPLOAD_URL', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({image: imageData}),
			});

			if (response.ok) {
				setIsModalOpen(false);
			} else {
				console.error('Error uploading image:', response.statusText);
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		} finally {
			setIsUploading(false);
			setIsModalOpen(false);
		}
	};

	const handleFontChange = (value) => setTextFont(value);
	const handleColorChange = (color) => setTextColor(color.hex);
	const handleTextChange = (e) => {
		setTextContent(e.target.value);
	};

	return (
		<div className="mt-10">
			<h1 className="text-2xl font-semibold text-center my-2">Thiết kế chữ khắc</h1>
			<div className="flex items-center justify-between">
				<label>Nội Dung:</label>
				<Input
					type="text"
					style={{width: 500}}
					value={textContent}
					onChange={handleTextChange}
					className="ml-5"
				/>
			</div>

			<div className="mb-10 flex items-center justify-between">
				<label>Kiểu Chữ:</label>
				<Select
					value={textFont}
					onChange={handleFontChange}
					style={{width: 500}}
					className="ml-5 my-5"
				>
					<Option value="Lucida Sans">Lucida Sans</Option>
					<Option value="Pinyon Script">Pinyon Script</Option>
				</Select>
			</div>

			{/* <canvas ref={canvasRef} className="border" /> */}

			<div className="flex flex-col">
				{/* <span className="my-5">Nhấn nút "Hoàn Thành" để khắc chữ</span> */}
				<span>Có thể bỏ qua khắc chữ!</span>
			</div>

			<div className="flex justify-between items-center my-10">
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={() => setStep((prev) => prev - 1)}
				>
					Quay lại
				</Button>
				{/* <Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={handleExportImage}
					disabled={textContent === ''}
				>
					Hoàn Thành
				</Button> */}
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					// disabled={!textContent}
					onClick={() => {
						setStep(3);
						setFontFamily(textFont);
						setTextValue(textContent);
					}}
				>
					Tiếp Tục
				</Button>
			</div>

			<Modal
				title="Xác nhận upload hình"
				open={isModalOpen}
				onCancel={() => setIsModalOpen(false)}
				onOk={uploadImage}
			>
				<div>
					<h3>
						Hình này sẽ được upload lên hệ thống, bạn có chắc chắn là hình ảnh đã thiết
						kế xong?
					</h3>
					{imageData && (
						<img
							src={imageData}
							alt="Preview"
							className="w-full border-2 border-red-600"
						/>
					)}
				</div>
			</Modal>
		</div>
	);
};
