# Open3d

Open3d is a 3d geometry library for JavaScript/Typescript inspired by [RhinoCommon](https://developer.rhino3d.com/api/RhinoCommon/html/R_Project_RhinoCommon.htm) API.

This library is created because so far there has not been a proper typed 3d geometry library for node environment. It is often necessary to calculate vector math or basic intersections of lines or planes but it is very cumbersome or error-prone to invent the wheel. And Open3d tries to save you from the distress. It is written in Typescript which supports native types for your project without the hassle of installing "@types/xxx". Also, it is a pure package that has zero dependencies.

It currently has `Vector3d`, `Line`, `Transform (or Matrix4x4)`, `Plane` and `Intersection` definitions.

# Install

Simple run

```bash
yarn add open3d
```

or

```bash
npm i open3d
```

to add the package to your project.

# Usage

If you are familiar with RhinoCommon, then Open3d should be very intuitive to use. Even if not, the functionalities are self-explanatory.

### Example 1: Find the closest point on a line for a test point

```typescript
const p = new Vector3d(1, 2, 3);

const from = new Vector3d(6, 7, 8);
const to = new Vector3d(-2, 0, 3);
const line = new Line(from, to);

const closestPt = line.ClosestPoint(p);
```

### Example 2: Intersection of two lines

```typescript
const line1 = new Line(new Vector3d(-4, -1, 0), new Vector3d(5, 0, 0));

const line2 = new Line(new Vector3d(0, -2, 0), new Vector3d(3, 7, 0));

const intersection = Intersection.LineLine(line1, line2);
```

### Example 3: Transform a plane and find the normal of the transformed plane

```typescript
// translation
const translate = Transform.Translation(new Vector3d(1, 2, 3));

// rotation
const rotation = Transform.Rotation(Math.PI / 3, new Vector3d(5, 2, 0), new Vector3d(-2, 2, 9));

// scale
const scale = Transform.Scale(new Vector3d(1, 2, 3), 3);

// mirror
const mirror = Transform.Mirror(new Plane(Vector3d.Zero, new Vector3d(8, 2, -4), new Vector3d(0, 8, 5)));

// combine transform
const transformation = Transform.CombineTransforms([translate, rotation, scale, mirror]);

// transform plane
const plane = new Plane(Vector3d.Zero, Vector3d.XAxis, Vector3d.YAxis);
const transformedPlane = plane.Transform(transformation);
```

# API Reference

The full API reference can be found at [https://open3d.vercel.app/](https://open3d.vercel.app/).

# Contribute

Any form of contributions to fix/optimize or extend the library are welcome! Please take advantage of Github's [issues](https://github.com/ccc159/open3d/issues) or [pull requests](https://github.com/ccc159/open3d/pulls). :)

# License

License to be clarified yet.
