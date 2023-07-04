# Blender_Path_To_ThreeJS
ThreeJS project to demonstrate importing a path or curve from Blender and recreating it as a CatmullRomCurve3


--------------------------------------------------------------------------------------------------------------
Purpose:
  
  This project is intended for demonstrating how to import a JSON file and convert the information into a CatmullRomCurve3.
  A Blender Add-on is available for exporting NURBS paths to a compatible JSON file that can be imported in this project.
  
  Blender Add-on: https://github.com/ClassOutside/Export_Vertices_To_JSON


--------------------------------------------------------------------------------------------------------------
How to import JSON as a CatmullRomCurve3:

1. In Blender convert a NURBS path or curve to a Mesh.
2. Export the created mesh to a JSON using the Add-on "Export Vertices to JSON".
3. Add the JSON to the ./dist/src/models/ folder.

_Required Files:_ ./src/curveTools/CurveMethods ./src/helpers/JSONHelper

4. Call loadCurveFromJSON from CurveMethods.js and pass the path to the JSON file.
   - This will load the JSON file. Then, convert it to a CatmullRomCurve3. It will also create a tube shaped mesh around the curve.
   - This method returns the curveAndMesh object.
     - The CatmullRomCurve3 is set to the returned object's .curve value.
     - The tube mesh is set to the returned object's .mesh value.
