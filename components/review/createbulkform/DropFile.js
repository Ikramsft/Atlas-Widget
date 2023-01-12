/* eslint-disable import/no-extraneous-dependencies */
import 'dropzone/dist/min/dropzone.min.css';
import Image from 'next/image';
import Papa from "papaparse";
import { Component } from 'react';
import DropzoneComponent from 'react-dropzone-component';
const ReactDOMServer = require('react-dom/server');

const dropzoneComponentConfig = {
	iconFiletypes: ['.csv'],
	postUrl: 'no-url',
};

const dropzoneConfig = {
	thumbnailHeight: 160,
	maxFilesize: 1,
	previewTemplate: ReactDOMServer.renderToStaticMarkup(
		<div className="dz-preview dz-file-preview mb-3">
			<div className="d-flex flex-row ">
				<div className="p-0 w-30 position-relative">
					<div className="dz-error-mark">
						<span>
							<i />{' '}
						</span>
					</div>
					<div className="dz-success-mark">
						<span>
							<i />
						</span>
					</div>
					<div className="preview-container">
						{/*  eslint-disable-next-line jsx-a11y/alt-text */}
						<Image width="30px" height="30px" data-dz-thumbnail className="img-thumbnail border-0" />
						<i className="simple-icon-doc preview-icon" />
					</div>
				</div>
				<div className="pl-3 pt-2 pr-2 pb-1 w-70 dz-details position-relative">
					<div>
						{' '}
						<span data-dz-name />{' '}
					</div>
					<div className="text-primary text-extra-small" data-dz-size />
					<div className="dz-progress">
						<span className="dz-upload" data-dz-uploadprogress />
					</div>
					<div className="dz-error-message">
						<span data-dz-errormessage />
					</div>
				</div>
			</div>
			<a href="#/" className="remove" data-dz-remove>
				{' '}
				<i className="glyph-icon simple-icon-trash" />{' '}
			</a>
		</div>
	),
	headers: { 'My-Awesome-Header': 'header value' },
};

export default class DropFile extends Component {
	clear() {
		this.myDropzone.removeAllFiles(true);
	}

	render() {
		return (
			<DropzoneComponent
				config={dropzoneComponentConfig}
				djsConfig={dropzoneConfig}
				eventHandlers={
					{
						addedfile: (file) => {
							const reader = new FileReader()
							const csv = Papa.parse(file, { header: true });

							const parsedData = csv?.data;
						},
						init: (dropzone) => {

							this.myDropzone = dropzone;
						},
					}
				}
			/>
		);
	}
}
