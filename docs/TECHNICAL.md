# Technical Documentation

## Architecture

IMGne is a client-side web application built with:
- React + TypeScript for the UI
- Tailwind CSS for styling
- browser-image-compression for image processing
- shadcn/ui for UI components

## Core Components

### ImageUploader
Handles file input through drag-and-drop or file selection.

### ImageProcessor
Manages image processing workflow:
- Preview original and processed images
- Handle format conversion
- Manage compression
- Add labels
- Download processed images

### ProcessingOptions
Controls for image processing:
- Format selection
- Quality adjustment
- Processing triggers

## Image Processing Pipeline

1. Image Upload
   - Validates file type and size
   - Creates preview

2. Processing
   - Compresses image using browser-image-compression
   - Converts format if needed
   - Adds label if specified
   - Generates final blob

3. Download
   - Creates downloadable link
   - Triggers browser download

## Performance Optimizations

- Lazy loading of heavy components
- Image compression in web worker
- Efficient memory management
- Optimized render cycles
- Debounced user inputs

## Security Considerations

- Client-side processing only - no data leaves the user's browser
- File type validation
- Size limitations (50MB max)
- Sanitized file names for downloads
- Content Security Policy implementation