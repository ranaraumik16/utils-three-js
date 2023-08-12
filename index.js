import * as THREE from 'three';

class BufferGeoUtils {
    constructor(inGeometry) {
        /**
         * @param {THREE.BufferGeometry} inGeometry
         */
        this.geometry = inGeometry;
    }
    static isBufferGeometry(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Boolean}
         * @description Checks if the geometry is a buffer geometry
         */
        return Boolean(geometry && geometry.isBufferGeometry);
    }
    static throwError(inMsg) {
        /**
         * @param {String} inMsg
         * @description Throws an error
         * @returns {Error}
         */
        throw new Error(inMsg);
    }
    static getPositionArray(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Array}
         * @description Returns the position array of the geometry
         * @throws {Error} if the geometry is not a buffer geometry
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        const positionAttribute = geometry.getAttribute('position');
        return positionAttribute.array;
    }
    static getNormalArray(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Array}
         * @description Returns the normal array of the geometry
         * @throws {Error} if the geometry is not a buffer geometry
         * @throws {Error} if the geometry does not have normals
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        const normalAttribute = geometry.getAttribute('normal');

        if (normalAttribute === undefined) {
            this.throwError('No normal attribute found');
        }
        return normalAttribute.array;
    }

    static getUVArray(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Array}
         * @description Returns the uv array of the geometry
         * @throws {Error} if the geometry is not a buffer geometry
         * @throws {Error} if the geometry does not have uv coordinates
         * @throws {Error} if the geometry does not have uv coordinates
        */
        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        const uvAttribute = geometry.getAttribute('uv');

        if (uvAttribute === undefined) this.throwError('No uv attribute found');
        return uvAttribute.array;
    }

    static getIndicesArray(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Array}
         * @description Returns the indices array of the geometry
         * @throws {Error} if the geometry is not a buffer geometry
         * @throws {Error} if the geometry does not have indices
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        const indexAttribute = geometry.getIndex();

        if (indexAttribute === null) this.throwError('No index attribute found');

        return indexAttribute.array;
    }

    static getNumberOfFaces(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Number}
         * @description Returns the number of faces of the geometry
         * @throws {Error} if the geometry is not a buffer geometry
         * @throws {Error} if the geometry does not have indices
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        const indexAttribute = geometry.getIndex();

        if (indexAttribute === null) {
            return BufferGeoUtils.getPositionArray(geometry).length / (3 * 3);
        }
        return indexAttribute.count / 3;
    }

    static getNumberOfVertices(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Number}
         * @description Returns the number of vertices of the geometry
         * @throws {Error} if the geometry is not a buffer geometry
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        return BufferGeoUtils.getPositionArray(geometry).length / 3;
    }

    static getPoint(geometry, index) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @param {Number} index
         * @returns {THREE.Vector3}
         * @description Returns the point at the given index
         * @throws {Error} if the geometry is not a buffer geometry
         * @throws {Error} if the index is out of range
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')
        
        let attribute = geometry.getAttribute('position');

        // Check if index is in range
        if (index >= attribute.count || index < 0) {
            this.throwError('Index out of range');
        }
        return new THREE.Vector3(
            attribute.array[index * 3],
            attribute.array[index * 3 + 1],
            attribute.array[index * 3 + 2]
        );
    }

    static getFacePointIndices(geometry, faceIndex) {
        /**
         * @param {THREE.BufferGeometry}
         * @param {Number} faceIndex
         * @returns {Array[Number]}
         * @description Returns the indices of the points of the face at the given index
         * @throws {Error} if the geometry is not a buffer geometry
         * @throws {Error} if the index is out of range
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        const indexAttribute = geometry.getIndex();

        // Check if index is in range
        if (faceIndex >= BufferGeoUtils.getNumberOfFaces(geometry) || faceIndex < 0) {
            this.throwError('Index out of range');
        }

        if (indexAttribute === null) {
            return [faceIndex * 3, (faceIndex * 3) + 1, (faceIndex * 3) + 2 ];
        }
        let array = indexAttribute.array;
        return [array[faceIndex * 3], array[(faceIndex * 3) + 1], array[(faceIndex * 3) + 2]];
    }

    static getFacePoints(geometry, faceIndex) {
        /**
         * @param {THREE.BufferGeometry}
         * @param {Number} faceIndex
         * @returns {Array[THREE.Vector3]}
         * @description Returns the points of the face at the given index
         * @throws {Error} if the geometry is not a buffer geometry
         * @throws {Error} if the index is out of range
         * @throws {Error} if the geometry does not have indices
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) this.throwError('Not a buffer geometry')

        let indices = BufferGeoUtils.getFacePointIndices(geometry, faceIndex);

        let points = [];
        for (let i = 0; i < indices.length; i++) {
            points.push(BufferGeoUtils.getPoint(geometry, indices[i]));
        }

        return points;
    }
}

class Object3DUtils {
    static throwError(message) {
        throw new Error(message);
    }

    static isObject(object) {
        /**
         * @param {THREE.Object3D} object
         * @returns {Boolean}
         * @description Returns true if the object is an object
         */

        if (object === undefined) return false;

        return object instanceof THREE.Object3D;
    }

    static isMesh(object) {
        /**
         * @param {THREE.Object3D} object
         * @returns {Boolean}
         * @description Returns true if the object is a mesh
         */

        if (object === undefined) return false;

        return object instanceof THREE.Mesh;
    }

    static getAllMeshes(object) {
        /**
         * @param {THREE.Object3D} object
         * @returns {Array[THREE.Mesh]}
         * @returns {Array[]} if the object is not instance of THREE.Object3D
         * @description Returns all meshes of the object
        */

        if (!Object3DUtils.isObject(object)) return [];

        let meshes = [];

        object.traverse((child) => {
            if (Object3DUtils.isMesh(child)) {
                meshes.push(child);
            }
        });

        return meshes;
    }
}

export { BufferGeoUtils, Object3DUtils };
