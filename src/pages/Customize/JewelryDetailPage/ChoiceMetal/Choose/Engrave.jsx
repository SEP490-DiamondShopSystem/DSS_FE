import React, {useEffect, useState, useRef} from 'react';

import {Button, Input, Modal, Select} from 'antd';
import {SketchPicker} from 'react-color'; // Import color picker component
import ring from '../../../../../assets/emerald-ring.png'; // Path to the image
import * as fabric from 'fabric';

const {Option} = Select; // Correctly import Option

export const Engrave = ({
	setStep,
	setImageData,
	imageData,
	customizeJewelry,
	setCustomizeJewelry,
	setFontFamily,
	fontFamily,
	setTextValue,
	textValue,
}) => {
	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [fontSize, setFontSize] = useState(30);
	const [textColor, setTextColor] = useState('#000'); // New state for text color
	const [textObject, setTextObject] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fabricCanvas = new fabric.Canvas(canvasRef.current, {
			width: 500,
			height: 500,
		});
		setCanvas(fabricCanvas);

		// Create image element from assets
		const imgElement = new Image();
		imgElement.src = ring; // Path to the image in assets
		imgElement.onload = () => {
			const fabricImg = new fabric.Image(imgElement);
			fabricImg.scaleToWidth(500);
			fabricImg.set({left: 0, top: 0, selectable: false}); // Image cannot be selected
			fabricCanvas.add(fabricImg); // Add image to canvas
			fabricCanvas.renderAll(); // Render the canvas

			// Add initial text after the image has been added
			const initialText = new fabric.Text(textValue, {
				left: 150,
				top: 250,
				fontSize: fontSize,
				fontFamily: fontFamily,
				fill: textColor,
				editable: true, // Allow editing
			});

			fabricCanvas.add(initialText); // Add text to canvas
			setTextObject(initialText);
			fabricCanvas.renderAll(); // Render the canvas again after adding text
		};

		return () => {
			fabricCanvas.dispose(); // Clean up when component unmounts
		};
	}, []); // Run only once when the component mounts

	useEffect(() => {
		if (textObject && canvas) {
			textObject.set({
				text: textValue,
				fontSize: fontSize,
				fontFamily: fontFamily,
				fill: textColor, // Update text color
			});
			canvas.renderAll(); // Render the canvas again after text changes
		}
	}, [textValue, fontSize, fontFamily, textColor, textObject, canvas]);

	// Function to export image from canvas and save to state
	const handleExportImage = () => {
		if (canvas) {
			// Wait for canvas to finish rendering before exporting
			setTimeout(() => {
				const dataURL = canvas.toDataURL({
					format: 'png',
					multiplier: 1,
				});

				setImageData(dataURL); // Set the image data to state
			}, 100); // Wait 100ms to ensure rendering is complete
		}
	};

	const uploadImage = async () => {
		if (!imageData) return; // Ensure there's image data to upload

		setIsUploading(true); // Start the upload process
		try {
			const response = await fetch('YOUR_AZURE_UPLOAD_URL', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({image: imageData}), // Sending the image data
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Image uploaded successfully:', result);
				setIsModalOpen(false); // Đóng modal sau khi upload thành công
			} else {
				console.error('Error uploading image:', response.statusText);
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		} finally {
			setIsUploading(false);
			setIsModalOpen(false); // Đảm bảo modal được đóng dù thành công hay thất bại
		}
	};

	// Handler for font selection
	const handleFontChange = (value) => {
		setFontFamily(value);
	};

	// Handler for text color change
	const handleColorChange = (color) => {
		setTextColor(color.hex);
	};

	// Handler for curved text toggle

	const handleTextChange = (e) => {
		setTextValue(e.target.value);
	};

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="mt-10">
			<div>
				<h1 className="text-2xl font-semibold text-center my-2">Thiết kế chữ khắc</h1>
				<div className="flex items-center justify-between">
					<label>Nội Dung:</label>
					<Input
						type="text"
						style={{width: 500}}
						value={textValue}
						onChange={handleTextChange}
						className="ml-5"
					/>
				</div>

				<div className="mb-10 flex items-center justify-between">
					<label>Kiểu Chữ:</label>
					<Select
						value={fontFamily}
						onChange={handleFontChange}
						style={{width: 500}}
						className="ml-5 my-5"
					>
						<Option value="Arial">Arial</Option>
						<Option value="Courier">Courier</Option>
						<Option value="Times New Roman">Times New Roman</Option>
						<Option value="Verdana">Verdana</Option>
						<Option value="Georgia">Georgia</Option>
						<Option value="Impact">Impact</Option>
						<Option value="Lora">Lora</Option>
					</Select>
				</div>

				{/* <div className="flex items-center mb-5">
					<label>Curved Text:</label>
					<Button onClick={handleCurvedTextToggle} className="ml-5">
						{isCurved ? 'Remove Curve' : 'Apply Curve'}
					</Button>
				</div> */}
				<canvas ref={canvasRef} className="border" />
			</div>
			<div className="text-red my-10">
				*Cần phải upload hình mới có thể thiết kế chữ khắc thành công
			</div>
			<div className="flex justify-between items-center">
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={() => setStep(0)}
				>
					Quay lại
				</Button>
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={handleExportImage}
				>
					Hoàn Thành
				</Button>
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={showModal}
					disabled={!imageData || isUploading}
				>
					Tải Hình
				</Button>
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={() => setStep(2)}
				>
					Tiếp Tục
				</Button>
			</div>
			<Modal
				title="Xác nhận upload hình"
				open={isModalOpen}
				onCancel={handleCancel}
				onOk={async () => {
					await uploadImage();
				}}
			>
				<div className="text-red">
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
