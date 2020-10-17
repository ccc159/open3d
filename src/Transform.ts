import { error } from 'console';
import { Vector3d } from './Vector3d';

export class Transform {
  m: number[];

  /**
   * Initializes a new transform matrix with a specified value along the diagonal.
   * @param diagonalValue Value to assign to all diagonal cells except M33 which is set to 1.0.
   */
  constructor(diagonalValue: number) {
    this.m = [diagonalValue, 0, 0, 0, 0, diagonalValue, 0, 0, 0, 0, diagonalValue, 0, 0, 0, 0, 1];
  }

  /**
   * The determinant of this 4x4 matrix.
   */
  public get Determinant(): number {
    throw error();
  }

  /**
   * Gets a new identity transform matrix. An identity matrix defines no transformation.
   */
  public static get Identity(): Transform {
    return new Transform(1);
  }

  /**
   * ZeroTransformation diagonal = (0,0,0,1)
   */
  public static get ZeroTransformation(): Transform {
    return new Transform(0);
  }

  /**
   * Constructs a new rotation transformation with specified angle and rotation center.
   * @param angle Angle (in Radians) of the rotation.
   * @param axis The axis to ratate around
   */
  public static Rotation(angle: number, axis: Vector3d): Transform {
    const xform = Transform.Identity;
    if (axis.Length === 0) return xform;
    let x = axis.X;
    let y = axis.Y;
    let z = axis.Z;

    const d = Math.sqrt(x * x + y * y + z * z);

    x = x / d;
    y = y / d;
    z = z / d;
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const t = 1 - c;

    xform.m[0] = x * x * t + c;
    xform.m[1] = x * y * t - z * s;
    xform.m[2] = x * z * t + y * s;
    xform.m[3] = 0;

    xform.m[4] = y * x * t + z * s;
    xform.m[5] = y * y * t + c;
    xform.m[6] = y * z * t - x * s;
    xform.m[7] = 0;

    xform.m[8] = z * x * t - y * s;
    xform.m[9] = z * y * t + x * s;
    xform.m[10] = z * z * t + c;
    xform.m[11] = 0;

    xform.m[12] = 0;
    xform.m[13] = 0;
    xform.m[14] = 0;
    xform.m[15] = 1;

    return xform;
  }

  public Scale() {}

  /**
   * Transpose the matrix and return a new one.
   */
  public Transpose() {
    const xform = Transform.Identity;
    xform.m[0] = this.m[0];
    xform.m[1] = this.m[4];
    xform.m[2] = this.m[8];
    xform.m[3] = this.m[12];
    xform.m[4] = this.m[1];
    xform.m[5] = this.m[5];
    xform.m[6] = this.m[9];
    xform.m[7] = this.m[13];
    xform.m[8] = this.m[2];
    xform.m[9] = this.m[6];
    xform.m[10] = this.m[10];
    xform.m[11] = this.m[14];
    xform.m[12] = this.m[3];
    xform.m[13] = this.m[7];
    xform.m[14] = this.m[11];
    xform.m[15] = this.m[15];
    return xform;
  }

  /**
   * Attempts to get the inverse transform of this transform.
   * code from https://stackoverflow.com/a/1148405
   */
  public TryInverse(): Transform | null {
    const inv = Transform.Identity;
    let det;
    let i;

    inv.m[0] =
      this.m[5] * this.m[10] * this.m[15] -
      this.m[5] * this.m[11] * this.m[14] -
      this.m[9] * this.m[6] * this.m[15] +
      this.m[9] * this.m[7] * this.m[14] +
      this.m[13] * this.m[6] * this.m[11] -
      this.m[13] * this.m[7] * this.m[10];

    inv.m[4] =
      -this.m[4] * this.m[10] * this.m[15] +
      this.m[4] * this.m[11] * this.m[14] +
      this.m[8] * this.m[6] * this.m[15] -
      this.m[8] * this.m[7] * this.m[14] -
      this.m[12] * this.m[6] * this.m[11] +
      this.m[12] * this.m[7] * this.m[10];

    inv.m[8] =
      this.m[4] * this.m[9] * this.m[15] -
      this.m[4] * this.m[11] * this.m[13] -
      this.m[8] * this.m[5] * this.m[15] +
      this.m[8] * this.m[7] * this.m[13] +
      this.m[12] * this.m[5] * this.m[11] -
      this.m[12] * this.m[7] * this.m[9];

    inv.m[12] =
      -this.m[4] * this.m[9] * this.m[14] +
      this.m[4] * this.m[10] * this.m[13] +
      this.m[8] * this.m[5] * this.m[14] -
      this.m[8] * this.m[6] * this.m[13] -
      this.m[12] * this.m[5] * this.m[10] +
      this.m[12] * this.m[6] * this.m[9];

    inv.m[1] =
      -this.m[1] * this.m[10] * this.m[15] +
      this.m[1] * this.m[11] * this.m[14] +
      this.m[9] * this.m[2] * this.m[15] -
      this.m[9] * this.m[3] * this.m[14] -
      this.m[13] * this.m[2] * this.m[11] +
      this.m[13] * this.m[3] * this.m[10];

    inv.m[5] =
      this.m[0] * this.m[10] * this.m[15] -
      this.m[0] * this.m[11] * this.m[14] -
      this.m[8] * this.m[2] * this.m[15] +
      this.m[8] * this.m[3] * this.m[14] +
      this.m[12] * this.m[2] * this.m[11] -
      this.m[12] * this.m[3] * this.m[10];

    inv.m[9] =
      -this.m[0] * this.m[9] * this.m[15] +
      this.m[0] * this.m[11] * this.m[13] +
      this.m[8] * this.m[1] * this.m[15] -
      this.m[8] * this.m[3] * this.m[13] -
      this.m[12] * this.m[1] * this.m[11] +
      this.m[12] * this.m[3] * this.m[9];

    inv.m[13] =
      this.m[0] * this.m[9] * this.m[14] -
      this.m[0] * this.m[10] * this.m[13] -
      this.m[8] * this.m[1] * this.m[14] +
      this.m[8] * this.m[2] * this.m[13] +
      this.m[12] * this.m[1] * this.m[10] -
      this.m[12] * this.m[2] * this.m[9];

    inv.m[2] =
      this.m[1] * this.m[6] * this.m[15] -
      this.m[1] * this.m[7] * this.m[14] -
      this.m[5] * this.m[2] * this.m[15] +
      this.m[5] * this.m[3] * this.m[14] +
      this.m[13] * this.m[2] * this.m[7] -
      this.m[13] * this.m[3] * this.m[6];

    inv.m[6] =
      -this.m[0] * this.m[6] * this.m[15] +
      this.m[0] * this.m[7] * this.m[14] +
      this.m[4] * this.m[2] * this.m[15] -
      this.m[4] * this.m[3] * this.m[14] -
      this.m[12] * this.m[2] * this.m[7] +
      this.m[12] * this.m[3] * this.m[6];

    inv.m[10] =
      this.m[0] * this.m[5] * this.m[15] -
      this.m[0] * this.m[7] * this.m[13] -
      this.m[4] * this.m[1] * this.m[15] +
      this.m[4] * this.m[3] * this.m[13] +
      this.m[12] * this.m[1] * this.m[7] -
      this.m[12] * this.m[3] * this.m[5];

    inv.m[14] =
      -this.m[0] * this.m[5] * this.m[14] +
      this.m[0] * this.m[6] * this.m[13] +
      this.m[4] * this.m[1] * this.m[14] -
      this.m[4] * this.m[2] * this.m[13] -
      this.m[12] * this.m[1] * this.m[6] +
      this.m[12] * this.m[2] * this.m[5];

    inv.m[3] =
      -this.m[1] * this.m[6] * this.m[11] +
      this.m[1] * this.m[7] * this.m[10] +
      this.m[5] * this.m[2] * this.m[11] -
      this.m[5] * this.m[3] * this.m[10] -
      this.m[9] * this.m[2] * this.m[7] +
      this.m[9] * this.m[3] * this.m[6];

    inv.m[7] =
      this.m[0] * this.m[6] * this.m[11] -
      this.m[0] * this.m[7] * this.m[10] -
      this.m[4] * this.m[2] * this.m[11] +
      this.m[4] * this.m[3] * this.m[10] +
      this.m[8] * this.m[2] * this.m[7] -
      this.m[8] * this.m[3] * this.m[6];

    inv.m[11] =
      -this.m[0] * this.m[5] * this.m[11] +
      this.m[0] * this.m[7] * this.m[9] +
      this.m[4] * this.m[1] * this.m[11] -
      this.m[4] * this.m[3] * this.m[9] -
      this.m[8] * this.m[1] * this.m[7] +
      this.m[8] * this.m[3] * this.m[5];

    inv.m[15] =
      this.m[0] * this.m[5] * this.m[10] -
      this.m[0] * this.m[6] * this.m[9] -
      this.m[4] * this.m[1] * this.m[10] +
      this.m[4] * this.m[2] * this.m[9] +
      this.m[8] * this.m[1] * this.m[6] -
      this.m[8] * this.m[2] * this.m[5];

    det = this.m[0] * inv.m[0] + this.m[1] * inv.m[4] + this.m[2] * inv.m[8] + this.m[3] * inv.m[12];

    if (det === 0) return null;

    det = 1.0 / det;

    for (i = 0; i < 16; i++) inv.m[i] = inv.m[i] * det;

    return inv;
  }
}
