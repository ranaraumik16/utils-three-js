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


// Perform operations on the geometry

const positionArray = BufferGeoUtils.getPositionArray(geometry);

const normalArray   = BufferGeoUtils.getNormalArray(geometry);

const uvArray       = BufferGeoUtils.getUVArray(geometry);

const facePoints    = BufferGeoUtils.getFacePoints(geometry,10)

// ...and more

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

`Object3DUtils`
| Method                   | Description                                                          | Parameters                                 | Returns                   |
|--------------------------|----------------------------------------------------------------------|--------------------------------------------|--------------------------|
| `isObject`               | Checks if the given object is an instance of THREE.Object3D.         | `object` (THREE.Object3D)                  | `Boolean`                |
| `isMesh`                 | Checks if the given object is an instance of THREE.Mesh.             | `object` (THREE.Object3D)                  | `Boolean`                |
| `getAllMeshes`           | Returns all meshes of the given object.                              | `object` (THREE.Object3D)                  | `Array[THREE.Mesh]`      |
| `unGroupAllMeshes`       | Un-groups all meshes of the given object.(Scaling may not work)      | `object` (THREE.Object3D)                  | `Array[THREE.Mesh]`      |
| `getBoundingBox`         | Returns the bounding box of the object.                              | `object` (THREE.Object3D), `inLocalSpace` (Boolean) (Optional)(default value is false)  | `THREE.Box3`    |
| `getClassInstanceObjects`| Returns all objects of the object with the given class.              | `object` (THREE.Object3D), `objectClass` (any)  | `Array<objectClass>`  |
## License

This project is licensed under the MIT License.