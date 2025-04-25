
import { useEffect, useRef } from "react";
import * as THREE from "three";

export function HexagonGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Hexagon geometry
    const hexagonGeometry = new THREE.CylinderGeometry(1, 1, 0.2, 6, 1);
    const hexMaterials = [
      new THREE.MeshPhongMaterial({ color: 0x0ea5e9, flatShading: true }),
      new THREE.MeshPhongMaterial({ color: 0x8b5cf6, flatShading: true })
    ];
    
    // Create hexagon grid
    const hexagons: THREE.Mesh[] = [];
    const rows = 5;
    const cols = 5;
    const spacing = 2.5;
    
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const hex = new THREE.Mesh(
          hexagonGeometry, 
          hexMaterials[Math.floor(Math.random() * hexMaterials.length)]
        );
        
        // Position hexagons in a grid with offset for every other row
        const offset = j % 2 === 0 ? 0 : spacing / 2;
        hex.position.x = (i * spacing) - (rows * spacing) / 2 + offset;
        hex.position.z = (j * spacing * 0.866) - (cols * spacing) / 2;
        hex.position.y = Math.random() * 3 - 1.5;
        
        // Random rotation
        hex.rotation.x = Math.PI / 2;
        hex.rotation.z = Math.random() * Math.PI;
        
        scene.add(hex);
        hexagons.push(hex);
      }
    }
    
    // Set camera position
    camera.position.z = 10;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate hexagons slowly
      hexagons.forEach((hex, i) => {
        hex.rotation.z += 0.002 + (i % 3) * 0.001;
        hex.position.y += Math.sin(Date.now() * 0.001 + i) * 0.003;
      });
      
      // Rotate entire scene
      scene.rotation.y += 0.002;
      scene.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener("resize", handleResize);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of resources
      hexagonGeometry.dispose();
      hexMaterials.forEach(material => material.dispose());
      renderer.dispose();
    };
  }, []);
  
  return <div ref={containerRef} className="w-full h-full"></div>;
}
