import * as THREE from 'three';
import { Face } from 'three/examples/jsm/math/ConvexHull.js';
import { VertexNode } from 'three/examples/jsm/math/ConvexHull.js';

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
         * @returns {Array<Number>}
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
         * @returns {Array<THREE.Vector3>}
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

    static getSurfaceArea(geometry) {
        /**
         * @param {THREE.BufferGeometry} geometry
         * @returns {Number}
         * @returns {undefined} if the geometry is not a buffer geometry
         * @description Returns the surface area of the geometry
         */

        if (!BufferGeoUtils.isBufferGeometry(geometry)) {
            console.warn('Not a buffer geometry');
            return undefined
        }

        let area = 0;
        let numberOfFaces = BufferGeoUtils.getNumberOfFaces(geometry);

        for (let i = 0; i < numberOfFaces; i++) {
            let points = BufferGeoUtils.getFacePoints(geometry, i);
            area += BufferGeoUtils.getTriangleArea(points[0], points[1], points[2]);
        }

        return area;
    }
    static getTriangleArea(p1, p2, p3) {
        /**
         * @param {THREE.Vector3} p1
         * @param {THREE.Vector3} p2
         * @param {THREE.Vector3} p3
         * @returns {Number}
         * @description Returns the area of the triangle with the given points
         */

        let VertexNode1 = new VertexNode(p1);
        let VertexNode2 = new VertexNode(p2);
        let VertexNode3 = new VertexNode(p3);

        let face = Face.create(VertexNode1, VertexNode2, VertexNode3);
        return face.area
    }
}

class Object3DUtils {
    static throwError(message) {
        throw new Error(message);
    }
    static throwWarning(message) {
        console.warn(message);
    }
    static isObject(object) {
        /**
         * @param {THREE.Object3D} object
         * @returns {Boolean}
         * @description Returns true if the object is an object
         */

        if (object === undefined) return false;

        return object.isObject3D;
    }

    static isMesh(object) {
        /**
         * @param {THREE.Object3D} object
         * @returns {Boolean}
         * @description Returns true if the object is a mesh
         */

        if (object === undefined) return false;

        return object.isMesh;
    }

    static getAllMeshes(object) {
        /**
         * @param {THREE.Object3D} object
         * @returns {Array<THREE.Mesh>}
         * @returns {Array} if the object is not instance of THREE.Object3D
         * @description Returns all meshes of the object
        */

        if (!object.isObject3D) return [];

        let meshes = [];

        object.traverse((child) => {
            if (child.isMesh) {
                meshes.push(child);
            }
        });

        return meshes;
    }

    static unGroupAllMeshes(object, removeMeshTransformation = false) {
        /**
         * @param {THREE.Object3D}
         * @param {Boolean} removeMeshTransformation
         * @returns {Array<THREE.Mesh>}
         * @returns {Array} if the object is not instance of THREE.Object3D
         * @description Returns all meshes of the object with un grouping them. If removeMeshTransformation is true, the transformation of the mesh is removed and applied to the geometry
         * @warning This function may not work properly if the object is non-uniformly scaled
         * 
         */

        if (!object.isObject3D) return [];

        let meshes = Object3DUtils.getAllMeshes(object);

        if (object.parent !== null) {
            meshes.forEach((mesh) => {
                object.parent.attach(mesh);
            });
            object.parent.remove(object);
        } else {
            console.warn("object is not attached to any parent");
            let dummyParent = new THREE.Object3D();
            dummyParent.add(object);

            meshes.forEach((mesh) => {
                object.parent.attach(mesh);
            });

            // Remove from dummy parent
            dummyParent.remove(object);
            meshes.forEach((mesh) => {
                dummyParent.remove(mesh);
            })

        }
        // Remove mesh transformation and apply it to the geometry
        if (removeMeshTransformation) {
            meshes.forEach((mesh) => {
                let wMat = mesh.matrixWorld
                let geo = mesh.geometry
                geo.applyMatrix4(wMat)

                mesh.position.set(0, 0, 0)
                mesh.rotation.set(0, 0, 0)
                mesh.scale.set(1, 1, 1)
            })
        }
        return meshes;

    }

    static getBoundingBox(object, inLocalSpace = false) {
        /**
         * @param {THREE.Object3D} object
         * @param {Boolean} inWorldSpace
         * @returns {THREE.Box3}
         * @description Returns the bounding box of the object
         * @throws {Error} if the object is not an instance of THREE.Object3D
         */

        if (!object.isObject3D) this.throwError('Not an object');
        object.updateWorldMatrix(true, true);
        let boundingBox = new THREE.Box3();

        boundingBox.setFromObject(object);

        if (inLocalSpace && object.parent !== null) {
            let matrix = object.parent.matrixWorld.clone();
            matrix.invert();
            boundingBox.applyMatrix4(matrix);
        }
        return boundingBox;
    }

    static getClassInstanceObjects(object, objectClass) {
        /**
         * @param {THREE.Object3D} object
         * @param {any} objectClass
         * @returns {Array<objectClass>}
         * @description Returns all objects of the object with the given class
         * @throws {Error} if the object is not an instance of THREE.Object3D
         */
        let objects = [];
        object.traverse((child) => {
            if (child instanceof objectClass) {
                objects.push(child);
            }
        });
        return objects;
    }
    static deleteMeshWithData(inMesh) {
        /**
         * @param {THREE.Mesh} inMesh
         * @description Deletes the mesh and its geometry, material, textures if they are not used by any other mesh
         * @warning This function delete geometry, material, textures of the mesh, make sure that they are not used by any other mesh
         */
        if (!inMesh || !inMesh.isMesh) {
            this.throwWarning('Not a mesh');
            return
        }

        let geometry = inMesh.geometry;

        if (geometry != undefined) {
            geometry.dispose();
        }

        let material = inMesh.material;

        if (material != undefined) {
            material.dispose();

            // Dispose textures
            if (material.map != null) material.map.dispose();
            if (material.aoMap != null) material.aoMap.dispose();
            if (material.emissiveMap != null) material.emissiveMap.dispose();
            if (material.bumpMap != null) material.bumpMap.dispose();
            if (material.normalMap != null) material.normalMap.dispose();
            if (material.displacementMap != null) material.displacementMap.dispose();
            if (material.roughnessMap != null) material.roughnessMap.dispose();
            if (material.metalnessMap != null) material.metalnessMap.dispose();
            if (material.alphaMap != null) material.alphaMap.dispose();
        }
        inMesh.parent.remove(inMesh);
        return true;
    }

    static deleteObjectWithData(inObject) {
        /**
         * @param {THREE.Object3D}
         * @description Deletes the object and its geometry, material, textures
         * @warning This function delete geometry, material, textures of the mesh, make sure that they are not used by any other mesh
         * @description It releases the memory of the object and its children
         */
        if (!inObject || !inObject.isObject3D) {
            this.throwWarning('Not an object');
            return
        }

        for (let i = inObject.children.length - 1; i >= 0; i--) {
            let child = inObject.children[i];
            if (child.isMesh) {
                Object3DUtils.deleteMeshWithData(child);
            } else {
                Object3DUtils.deleteObjectWithData(child);
            }
        }
        return true;
    }

}

class UtilsMath {
    static throwError(message) {
        throw new Error(message);
    }
    static throwWarning(message) {
        console.warn(message);
    }
    static removeFloatingPointError(value, decimals = 2) {
        /**
         * @param {Number} value
         * @param {Number} decimals
         * @returns {Number}
         * @description Removes the floating point error of the given value
         */
        let multiplier = Math.pow(10, decimals || 0);
        return Math.round(value * multiplier) / multiplier;
    }
    static removeFloatingPointErrorVec3(inVec, inDecimals = 2) {
        /**
         * @param {THREE.Vector3} inVec
         * @param {Number} inDecimals
         * @returns {THREE.Vector3}
         * @description Removes the floating point error of the given vector
         */

        if(!inVec.isVector3) {
            this.throwWarning('Not a vector');
            return inVec
        }
        
        let x = this.removeFloatingPointError(inVec.x, inDecimals)
        let y = this.removeFloatingPointError(inVec.y, inDecimals)
        let z = this.removeFloatingPointError(inVec.z, inDecimals)
        return new THREE.Vector3(x, y, z)
    }
}

export { BufferGeoUtils, Object3DUtils, UtilsMath };
