# utils-three-js

A utility library for working with BufferGeometry in Three.js.
I have created this library to make it easier to work with BufferGeometry in Three.js.

## Installation

You can install `utils-three-js` using npm:


```
    npm install utils-three-js
```

## Usage

import { BufferGeoUtils } from 'utils-three-js';
import * as THREE from 'three';

// Create a BufferGeometry
const geometry = new THREE.BoxGeometry();

// Check if the geometry is a BufferGeometry
if (BufferGeoUtils.isBufferGeometry(geometry)) {
    // Perform operations on the geometry
    const positionArray = BufferGeoUtils.getPositionArray(geometry);
    const normalArray = BufferGeoUtils.getNormalArray(geometry);
    const uvArray = BufferGeoUtils.getUVArray(geometry);
    const facePoints = BufferGeoUtils.getFacePoints(geometry,10)
    // ...and more
}

## API Documentation
`BufferGeoUtils`

| Method                   | Description                                                          | Parameters                                 | Returns                   |
|--------------------------|----------------------------------------------------------------------|--------------------------------------------|--------------------------|
| `isBufferGeometry`       | Checks if the given geometry is a BufferGeometry.                   | `geometry` (THREE.BufferGeometry)           | `Boolean`                |
| `getPositionArray`       | Returns the position array of the geometry.                          | `geometry` (THREE.BufferGeometry)           | `Array`                  |
| `getNormalArray`         | Returns the normal array of the geometry.                            | `geometry` (THREE.BufferGeometry)           | `Array`                  |
| `getUVArray`             | Returns the UV array of the geometry.                                | `geometry` (THREE.BufferGeometry)           | `Array`                  |
| `getIndicesArray`        | Returns the indices array of the geometry.                           | `geometry` (THREE.BufferGeometry)           | `Array`                  |
| `getNumberOfFaces`       | Returns the number of faces in the geometry.                         | `geometry` (THREE.BufferGeometry)           | `Number`                 |
| `getNumberOfVertices`    | Returns the number of vertices in the geometry.                      | `geometry` (THREE.BufferGeometry)           | `Number`                 |
| `getPoint`               | Returns the point at the given index.                                | `geometry` (THREE.BufferGeometry), `index` (Number) | `THREE.Vector3`           |
| `getFacePointIndices`    | Returns the indices of the points of the face at the given index.    | `geometry` (THREE.BufferGeometry), `faceIndex` (Number) | `Array[Number]`           |
| `getFacePoints`          | Returns the points of the face at the given index.                   | `geometry` (THREE.BufferGeometry), `faceIndex` (Number) | `Array[THREE.Vector3]`    |

## License

This project is licensed under the MIT License.