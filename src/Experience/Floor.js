import * as THREE from 'three'
import Experience from './Experience.js'

import floorBackgroundVertex from './shaders/floorBackground/vertex.glsl'
import floorBackgroundFragment from './shaders/floorBackground/fragment.glsl'





export default class Floor
{
    constructor(_options)
    {
        // Options
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene


        // Debug
        if(this.debug)
        {
            this.debugFolder = this.debug.addFolder({
                title: 'floor'
            }) 
        }
        
        this.setBackground()
    }

    setBackground()
    {
        this.background = {}


        // Colors
        this.background.colors = {}

        this.background.colors.topLeft = {}
        this.background.colors.topLeft.value = '#6d7120'
        this.background.colors.topLeft.instance = new THREE.Color(this.background.colors.topLeft.value)
        
        this.background.colors.topRight = {}
        this.background.colors.topRight.value = '#6c701d'
        this.background.colors.topRight.instance = new THREE.Color(this.background.colors.topRight.value)
        
        this.background.colors.bottomLeft = {}
        this.background.colors.bottomLeft.value = '#d1d745'
        this.background.colors.bottomLeft.instance = new THREE.Color(this.background.colors.bottomLeft.value)
        
        this.background.colors.bottomRight = {}
        this.background.colors.bottomRight.value = '#b2b839'
        this.background.colors.bottomRight.instance = new THREE.Color(this.background.colors.bottomRight.value)


  
        // Geometry
        this.background.geometry = new THREE.PlaneGeometry(2,2,1,1)

        // Material
        this.background.material = new THREE.ShaderMaterial({
            vertexColors: true,
            depthWrite: false,
            vertexShader: floorBackgroundVertex,
            fragmentShader: floorBackgroundFragment
        })

        
        
        // Mesh
        this.background.mesh = new THREE.Mesh(this.background.geometry, this.background.material)
        this.scene.add(this.background.mesh);
        
        // Update colors
        this.background.updateColors = () =>
        {
            this.background.colors.topLeft.instance.set(this.background.colors.topLeft.value)
            this.background.colors.topRight.instance.set(this.background.colors.topRight.value)
            this.background.colors.bottomLeft.instance.set(this.background.colors.bottomLeft.value)
            this.background.colors.bottomRight.instance.set( this.background.colors.bottomRight.value)

            const colors = new Float32Array(4 * 3)
            colors[0] = this.background.colors.topLeft.instance.r
            colors[1] = this.background.colors.topLeft.instance.g
            colors[2] = this.background.colors.topLeft.instance.b

            colors[3] = this.background.colors.topRight.instance.r
            colors[4] = this.background.colors.topRight.instance.g
            colors[5] = this.background.colors.topRight.instance.b

            colors[6] = this.background.colors.bottomLeft.instance.r
            colors[7] = this.background.colors.bottomLeft.instance.g
            colors[8] = this.background.colors.bottomLeft.instance.b
            
            colors[9] = this.background.colors.bottomRight.instance.r
            colors[10] = this.background.colors.bottomRight.instance.g
            colors[11] = this.background.colors.bottomRight.instance.b

            this.background.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        }
        this.background.updateColors()
        
        // Debug
        if(this.debug)
        {
            for(const _colorName in this.background.colors)
            {
                const color = this.background.colors[_colorName]
                
                this.debugFolder
                .addInput(
                    color,
                    'value',
                    {
                        label: `${_colorName}Color`, view: 'color'
                    }
                )
                .on('change', this.background.updateColors)
            }
        }
    }
}

