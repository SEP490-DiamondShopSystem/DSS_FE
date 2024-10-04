import React, {useEffect, useState, useRef} from 'react';
import {Button, Input, Select} from 'antd';
import ring from '../../../../../assets/emerald-ring.png'; // Path to the image
import * as fabric from 'fabric';

const {Option} = Select; // Correctly import Option

export const Engrave = ({setStep}) => {
	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [textValue, setTextValue] = useState('Your Text Here');
	const [fontSize, setFontSize] = useState(30);
	const [fontFamily, setFontFamily] = useState('Arial');
	const [textObject, setTextObject] = useState(null);
	const [imageData, setImageData] = useState(null); // State to store the image data
	const [isUploading, setIsUploading] = useState(false); // State to track upload status

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
			fabricImg.scaleToWidth(300);
			fabricImg.set({left: 100, top: 100, selectable: false}); // Image cannot be selected
			fabricCanvas.add(fabricImg); // Add image to canvas
			fabricCanvas.renderAll(); // Render the canvas

			// Add initial text after the image has been added
			const initialText = new fabric.Text(textValue, {
				left: 150,
				top: 250,
				fontSize: fontSize,
				fontFamily: fontFamily,
				fill: '#000',
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
			});
			canvas.renderAll(); // Render the canvas again after text changes
		}
	}, [textValue, fontSize, fontFamily, textObject, canvas]);

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

	// Function to upload image data to Azure
	const uploadImage = async () => {
		if (!imageData) return; // Ensure there's image data to upload

		setIsUploading(true); // Start the upload process
		try {
			const response = await fetch('YOUR_AZURE_UPLOAD_URL', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					// Include any other necessary headers like Authorization if needed
				},
				body: JSON.stringify({image: imageData}), // Sending the image data
			});

			if (response.ok) {
				const result = await response.json();
				console.log('Image uploaded successfully:', result);
			} else {
				console.error('Error uploading image:', response.statusText);
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		} finally {
			setIsUploading(false); // End the upload process
		}
	};

	// Handler for font selection
	const handleFontChange = (value) => {
		setFontFamily(value);
	};

	return (
		<div className="mt-10">
			<div>
				<h1 className="text-2xl font-semibold text-center my-2">Thiết kế chữ khắc</h1>
				<div className="flex items-center">
					<label>Text:</label>
					<Input
						type="text"
						value={textValue}
						onChange={(e) => setTextValue(e.target.value)}
						className="ml-5"
					/>
				</div>
				<div className="flex items-center my-5">
					<label>Font Size:</label>
					<Input
						type="number"
						value={fontSize}
						onChange={(e) => setFontSize(parseInt(e.target.value))}
						className="ml-5 w-16"
					/>
				</div>
				<div>
					<label>Font Family:</label>
					<Select
						value={fontFamily}
						onChange={handleFontChange}
						style={{width: 200}}
						className="ml-5"
					>
						<Option value="Arial">Arial</Option>
						<Option value="Courier">Courier</Option>
						<Option value="Times New Roman">Times New Roman</Option>
					</Select>
				</div>
				<canvas ref={canvasRef} />
			</div>
			<div className="flex justify-between items-center mt-10">
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={() => setStep(1)}
				>
					Quay lại
				</Button>
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={handleExportImage}
				>
					Xuất Hình
				</Button>
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={uploadImage}
					disabled={!imageData || isUploading}
				>
					Upload Hình
				</Button>
				<Button
					type="text"
					className="bg-primary w-32 uppercase font-semibold"
					onClick={() => setStep(2)}
					disabled={!imageData || isUploading}
				>
					Tiếp Tục
				</Button>
			</div>
		</div>
	);
};
