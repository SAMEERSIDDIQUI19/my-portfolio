const fs = require('fs');
const path = require('path');

// Create a simple 16x16 favicon with SAS text
// This creates a basic ICO file structure
function createSASFaviconICO() {
    // ICO file header (6 bytes)
    const header = Buffer.alloc(6);
    header.writeUInt16LE(0, 0);     // Reserved (must be 0)
    header.writeUInt16LE(1, 2);     // Image type (1 = ICO)
    header.writeUInt16LE(1, 4);     // Number of images

    // Image directory entry (16 bytes)
    const dirEntry = Buffer.alloc(16);
    dirEntry.writeUInt8(16, 0);     // Width (16 pixels)
    dirEntry.writeUInt8(16, 1);     // Height (16 pixels)
    dirEntry.writeUInt8(0, 2);      // Color palette (0 = no palette)
    dirEntry.writeUInt8(0, 3);      // Reserved
    dirEntry.writeUInt16LE(1, 4);   // Color planes
    dirEntry.writeUInt16LE(32, 6);  // Bits per pixel
    dirEntry.writeUInt32LE(1128, 8); // Image data size
    dirEntry.writeUInt32LE(22, 12); // Offset to image data

    // Create a simple 16x16 bitmap with SAS
    // This is a simplified bitmap - normally you'd need proper BMP headers
    const bitmapHeader = Buffer.alloc(40);
    bitmapHeader.writeUInt32LE(40, 0);      // Header size
    bitmapHeader.writeInt32LE(16, 4);       // Width
    bitmapHeader.writeInt32LE(32, 8);       // Height (doubled for ICO)
    bitmapHeader.writeUInt16LE(1, 12);      // Planes
    bitmapHeader.writeUInt16LE(32, 14);     // Bits per pixel
    bitmapHeader.writeUInt32LE(0, 16);      // Compression
    bitmapHeader.writeUInt32LE(1024, 20);   // Image size
    bitmapHeader.writeUInt32LE(0, 24);      // X pixels per meter
    bitmapHeader.writeUInt32LE(0, 28);      // Y pixels per meter
    bitmapHeader.writeUInt32LE(0, 32);      // Colors used
    bitmapHeader.writeUInt32LE(0, 36);      // Important colors

    // Create pixel data (16x16 RGBA)
    const pixelData = Buffer.alloc(1024); // 16*16*4 bytes
    
    // Fill with gradient background and SAS text pattern
    for (let y = 0; y < 16; y++) {
        for (let x = 0; x < 16; x++) {
            const offset = ((15 - y) * 16 + x) * 4; // ICO uses bottom-up bitmap
            
            // Create gradient from blue to dark blue
            const r = Math.floor(0 + (212 * x / 15));
            const g = Math.floor(9 + (212 * x / 15));
            const b = Math.floor(121 + (134 * x / 15));
            
            // Simple SAS pattern (very basic)
            let isText = false;
            if (y >= 6 && y <= 10) {
                // S pattern
                if ((x >= 2 && x <= 4) || (x >= 6 && x <= 8) || (x >= 12 && x <= 14)) {
                    if ((y === 6 || y === 8 || y === 10) || 
                        (x === 2 && y === 7) || 
                        (x === 8 && y === 7) || 
                        (x === 14 && y === 9)) {
                        isText = true;
                    }
                }
            }
            
            if (isText) {
                pixelData[offset] = 255;     // B
                pixelData[offset + 1] = 255; // G
                pixelData[offset + 2] = 255; // R
                pixelData[offset + 3] = 255; // A
            } else {
                pixelData[offset] = b;       // B
                pixelData[offset + 1] = g;   // G
                pixelData[offset + 2] = r;   // R
                pixelData[offset + 3] = 255; // A
            }
        }
    }

    // AND mask (16x16 bits = 32 bytes)
    const andMask = Buffer.alloc(32, 0);

    // Combine all parts
    const favicon = Buffer.concat([header, dirEntry, bitmapHeader, pixelData, andMask]);
    
    // Write to favicon.ico
    const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
    fs.writeFileSync(faviconPath, favicon);
    
    console.log('SAS favicon created successfully at:', faviconPath);
}

createSASFaviconICO();
