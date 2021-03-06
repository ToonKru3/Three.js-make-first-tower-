import * as THREE from 'three'
import Experience from './Experience.js'


export default class MatcapsModel
{
    constructor(_options)
    {
        // Options
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        

        this.setModel()
        console.log('Dragon ')
    }

    setModel()
    {
        
        this.model = {}
        this.model.resource = this.resources.items.model


        // Materials
        this.model.materials = {}

        this.model.resource.scene.traverse((_child) =>
        {
            if(_child instanceof THREE.Mesh && _child.material instanceof THREE.MeshStandardMaterial)
            {
                let material = this.model.materials[_child.material.name]
                
                if(!material)
                {
                    material = {}
                    material.original = _child.material
                    material.meshes = []

                    this.model.materials[_child.material.name] = material
                }
                material.meshes.push(_child)
        
            }
        })


        // Create new materials
        for(const _materialKey in this.model.materials)
        {
            const material = this.model.materials[_materialKey]

            
            // console.log(material.original.name)
            // console.log(this.resources.items[`${material.orginal.name}MatcapTexture`])
            
            
            material.new = new THREE.MeshMatcapMaterial({ matcap: this.resources.items[`${material.original.name}MatcapTexture`] })
            
            for(const _mesh of material.meshes)
            {
                _mesh.material = material.new
            }
        }

        this.scene.add(this.model.resource.scene)
    }
}

