!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Open3d=e():t.Open3d=e()}(this,(()=>(()=>{"use strict";var t={465:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Intersection=void 0;const i=n(975),r=n(582),s=n(653),o=n(561),a=n(614),l=n(35);class u{constructor(){throw new Error("Cannot initialize an intersection instance.")}static LineLineTParameters(t,e){const n=t.From.SubtractPoint(e.From),i=e.Direction,r=t.Direction,s=n.DotProduct(i),a=i.DotProduct(r),l=n.DotProduct(r),u=i.DotProduct(i),h=r.DotProduct(r)*u-a*a,c=s*a-l*u;if(o.Open3dMath.EpsilonEquals(h,0))return null;const d=c/h;return[d,(s+a*d)/u]}static LineLine(t,e,n=!1,i=s.Open3d.EPSILON){const r=u.CrossingLineLine(t,e,n,i);return r?r.PointA.AddPoint(r.PointB).Multiply(.5):null}static CrossingLineLine(t,e,n=!1,r=1/0){if(!t.IsValid||!e.IsValid)return null;const s=u.LineLineTParameters(t,e);if(!s)return null;const[o,a]=s,l=t.PointAt(o),h=e.PointAt(a),c=l.DistanceTo(h);return n&&(o<0||o>1||a<0||a>1)||c>r?null:new i.IntersectionEvent(o,a,l,h)}static LinePlane(t,e,n=!1){const i=t.From.SubtractPoint(e.Origin).DotProduct(e.Normal),r=t.UnitDirection.DotProduct(e.Normal);if(o.Open3dMath.EpsilonEquals(r,0))return null;const s=-i/r;return n&&(s<0||s>t.Length)?null:t.From.Add(t.UnitDirection.Multiply(s))}static PlanePlane(t,e){if(t.Normal.IsParallelTo(e.Normal))return null;const n=e.Normal.CrossProduct(t.Normal),i=t.Origin.AddPoint(e.Origin).Multiply(.5),s=a.Plane.CreateFromNormal(i,n),o=u.PlanePlanePlane(t,e,s);return null==o?null:new r.Line(o,o.Add(s.Normal))}static PlanePlanePlane(t,e,n){const i=t.Equation,r=e.Equation,s=n.Equation,a=[i[0],i[1],i[2],r[0],r[1],r[2],s[0],s[1],s[2]],u=[-i[3],-r[3],-s[3]],[h,c,d,P,m,p,f,Y,X]=a,O=h*(m*X-p*Y)-c*(P*X-p*f)+d*(P*Y-m*f);if(o.Open3dMath.EpsilonEquals(O,0))return null;const Z=1/O,A=Z*(m*X-p*Y)*u[0]+Z*(d*Y-c*X)*u[1]+Z*(c*p-d*m)*u[2],g=Z*(p*f-P*X)*u[0]+Z*(h*X-d*f)*u[1]+Z*(d*P-h*p)*u[2],M=Z*(P*Y-m*f)*u[0]+Z*(c*f-h*Y)*u[1]+Z*(h*m-c*P)*u[2];return new l.Point3d(A,g,M)}}e.Intersection=u},975:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.IntersectionEvent=void 0,e.IntersectionEvent=class{constructor(t,e,n,i){this.ParameterA=t,this.ParameterB=e,this.PointA=n,this.PointB=i}}},582:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Line=void 0;const i=n(465),r=n(653),s=n(561),o=n(614);class a{constructor(t,e){this.From=t,this.To=e}get IsValid(){return!this.From.Equals(this.To)}get Direction(){if(!this.IsValid)throw new Error("Cannot get direction of an invalid line.");return this.To.SubtractPoint(this.From)}get UnitDirection(){return this.Direction.Unitize()}get Length(){return this.To.DistanceTo(this.From)}set Length(t){let e=this.UnitDirection;t<0&&(e=e.Reverse()),this.To=this.From.Add(e.Multiply(Math.abs(t)))}Clone(){return new a(this.From,this.To)}PointAt(t){if(!this.IsValid)throw new Error("Cannot evaluate an invalid line.");return this.Direction.Multiply(t).AddToPoint(this.From)}PointAtLength(t){if(!this.IsValid)throw new Error("Cannot evaluate an invalid line.");return this.UnitDirection.Multiply(t).AddToPoint(this.From)}ClosestParameter(t,e=!1){if(!this.IsValid)throw new Error("Invalid line does not have a closest point.");const n=t.SubtractPoint(this.From),i=this.To.SubtractPoint(this.From),r=i.DotProduct(i);let o=i.DotProduct(n)/r;return e&&(o=s.Open3dMath.Clamp(o,0,1)),o}ClosestPoint(t,e=!1){const n=this.ClosestParameter(t,e);return this.PointAt(n)}Equals(t){return this.From.Equals(t.From)&&this.To.Equals(t.To)}IsPointOn(t,e=!1,n=r.Open3d.EPSILON){return this.DistanceTo(t,e)<=n}Extend(t,e){if(!this.IsValid)throw new Error("Cannot extend an invalid line.");const n=this.UnitDirection.Multiply(-t).AddToPoint(this.From),i=this.UnitDirection.Multiply(e).AddToPoint(this.To);return new a(n,i)}DistanceTo(t,e=!1){return t instanceof a?a.LineLineDistance(this,t,e):t instanceof o.Plane?a.LinePlaneDistance(this,t,e):a.LinePointDistance(this,t,e)}Flip(){return new a(this.To,this.From)}Transform(t){const e=this.From.Transform(t),n=this.To.Transform(t);return new a(e,n)}static LinePointClosestParameter(t,e){if(!t.IsValid)return 0;const n=e.SubtractPoint(t.From),i=t.To.SubtractPoint(t.From),r=i.DotProduct(i);return i.DotProduct(n)/r}static LinePointClosestPoint(t,e,n){let i=a.LinePointClosestParameter(t,e);return n&&(i=s.Open3dMath.Clamp(i,0,1)),t.PointAt(i)}static LinePointDistance(t,e,n){const i=a.LinePointClosestPoint(t,e,n);return e.DistanceTo(i)}}e.Line=a,a.LineLineClosestPoints=(t,e,n)=>{const r=i.Intersection.CrossingLineLine(t,e,n);return r?[r.PointA,r.PointB]:null},a.LineLineDistance=(t,e,n)=>{const r=i.Intersection.CrossingLineLine(t,e,n);return r?r.PointA.DistanceTo(r.PointB):n?Math.min(a.LinePointDistance(e,t.From),a.LinePointDistance(e,t.To),a.LinePointDistance(t,e.From),a.LinePointDistance(t,e.To)):a.LinePointDistance(t,e.From)},a.LinePlaneDistance=(t,e,n)=>i.Intersection.LinePlane(t,e,n)?0:n?Math.min(e.DistanceTo(t.From),e.DistanceTo(t.To)):e.DistanceTo(t.From)},462:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Point3dList=e.List=void 0;class n{constructor(t){this.items=void 0===t?[]:t}Get(t){return this.items[t]}Set(t,e){this.items[t]=e}get Count(){return this.items.length}get First(){return this.items[0]}set First(t){this.items[0]=t}get Last(){return this.items[this.Count-1]}set Last(t){this.items[this.Count-1]=t}Clear(){this.items.length=0}Add(t){this.items.push(t)}AddRange(t){this.items.push(...t)}Contains(t,e){return this.items.includes(t,e)}Exists(t){return this.items.some(t)}Find(t){return this.items.find(t)}FindIndex(t){return this.items.findIndex(t)}FindAll(t){return this.items.filter(t)}ForEach(t){this.items.forEach(t)}Insert(t,e){this.items.splice(t,0,e)}InsertRange(t,e){this.items.splice(t,0,...e)}get NullOrUndefinedCount(){return this.items.filter((t=>null==t)).length}Reduce(t){return this.items.reduce(t)}Pop(){return this.items.pop()}Shift(){return this.items.shift()}Filter(t){return this.items.filter(t)}Map(t){return this.items.map(t)}Remove(t){const e=this.items.indexOf(t);e>-1&&this.items.splice(e,1)}RemoveBy(t){const e=this.Find(t);e&&this.Remove(e)}RemoveAll(t){this.items.filter(t).forEach((t=>this.Remove(t)))}Sort(t){this.items.sort(t)}Reverse(){return this.items.reverse()}}e.List=n,e.Point3dList=class extends n{}},653:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Open3d=void 0,function(t){let e;!function(t){t[t.Parallel=1]="Parallel",t[t.NotParallel=0]="NotParallel",t[t.AntiParallel=-1]="AntiParallel"}(e=t.ParallelIndicator||(t.ParallelIndicator={})),t.EPSILON=1e-6,t.ANGLE_EPSILON=.001}(e.Open3d||(e.Open3d={}))},561:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Open3dMath=void 0;const i=n(653);class r{static Clamp(t,e,n){if(e>n){const t=e;e=n,n=t}return Math.min(Math.max(t,e),n)}static ToDegrees(t){return 180*t/Math.PI}static ToRadians(t){return t*Math.PI/180}}e.Open3dMath=r,r.EpsilonEquals=(t,e,n=i.Open3d.EPSILON)=>Math.abs(t-e)<n},614:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Plane=void 0;const i=n(582),r=n(226),s=n(35),o=n(653);class a{constructor(t,e,n){if(e.IsTiny()||n.IsTiny())throw new Error("The input axis is not valid.");if(e.IsParallelTo(n))throw new Error("XAxis and YAxis should not be parallel.");e=e.Unitize(),n=n.Unitize();const i=e.CrossProduct(n).Unitize();n=i.CrossProduct(e).Unitize(),this.Origin=t,this.XAxis=e,this.YAxis=n,this.ZAxis=i}get Normal(){return this.ZAxis.Unitize()}get XAxisLine(){return new i.Line(this.Origin,this.Origin.Add(this.XAxis))}get YAxisLine(){return new i.Line(this.Origin,this.Origin.Add(this.YAxis))}get ZAxisLine(){return new i.Line(this.Origin,this.Origin.Add(this.ZAxis))}get Equation(){const{X:t,Y:e,Z:n}=this.Normal;return[t,e,n,-t*this.Origin.X-e*this.Origin.Y-n*this.Origin.Z]}static get PlaneXY(){return new a(s.Point3d.Origin,r.Vector3d.XAxis,r.Vector3d.YAxis)}static get PlaneZX(){return new a(s.Point3d.Origin,r.Vector3d.ZAxis,r.Vector3d.XAxis)}static get PlaneYZ(){return new a(s.Point3d.Origin,r.Vector3d.YAxis,r.Vector3d.ZAxis)}PointAt(t,e){return this.Origin.Add(this.XAxis.Multiply(t)).Add(this.YAxis.Multiply(e))}ClosestParameter(t){return[this.XAxisLine.ClosestParameter(t),this.YAxisLine.ClosestParameter(t)]}ClosestPoint(t){return this.PointAt(...this.ClosestParameter(t))}DistanceTo(t){const e=t.SubtractPoint(this.Origin),n=t.DistanceTo(this.ClosestPoint(t));return e.DotProduct(this.ZAxis)>0?n:-n}Clone(){return new a(this.Origin,this.XAxis,this.YAxis)}Flip(){return new a(this.Origin,this.YAxis,this.XAxis)}IsPointCoplanar(t,e=o.Open3d.EPSILON){return this.ClosestPoint(t).DistanceTo(t)<e}IsLineCoplanar(t,e=o.Open3d.EPSILON){return this.IsPointCoplanar(t.From,e)&&this.IsPointCoplanar(t.To,e)}static CreateFromNormal(t,e){const n=e.Unitize(),i=e.GetPerpendicularVector(),r=n.CrossProduct(i).Unitize();return new a(t,i,r)}static CreateFromFrame(t,e,n){return new a(t,e,n)}static CreateFrom3Points(t,e,n){const i=e.SubtractPoint(t),r=n.SubtractPoint(t),s=i.CrossProduct(r).CrossProduct(i);return new a(t,i,s)}Transform(t){const e=this.Origin.Transform(t),n=this.XAxis.Transform(t),i=this.YAxis.Transform(t);return new a(e,n,i)}}e.Plane=a},35:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Point3d=void 0;const i=n(561),r=n(226);class s{constructor(t,e,n){this.X=t,this.Y=e,this.Z=n}static CreateFromVector(t){return new s(t.X,t.Y,t.Z)}static CreateFromPoint3d(t){return new s(t.X,t.Y,t.Z)}static get Origin(){return new s(0,0,0)}static Add(t,e){return new s(t.X+e.X,t.Y+e.Y,t.Z+e.Z)}static AddPoint(t,e){return new s(t.X+e.X,t.Y+e.Y,t.Z+e.Z)}Add(t){return s.Add(this,t)}AddPoint(t){return s.AddPoint(this,t)}static Subtract(t,e){return new s(t.X-e.X,t.Y-e.Y,t.Z-e.Z)}static SubtractPoint(t,e){return new r.Vector3d(t.X-e.X,t.Y-e.Y,t.Z-e.Z)}Subtract(t){return s.Subtract(this,t)}SubtractPoint(t){return s.SubtractPoint(this,t)}static Multiply(t,e){return new s(t.X*e,t.Y*e,t.Z*e)}Multiply(t){return s.Multiply(this,t)}static Divide(t,e){if(0===e)throw new Error("Division by zero");const n=1/e;return new s(t.X*n,t.Y*n,t.Z*n)}Divide(t){return s.Divide(this,t)}static Interpolate(t,e,n){return new s(t.X+(e.X-t.X)*n,t.Y+(e.Y-t.Y)*n,t.Z+(e.Z-t.Z)*n)}static Distance(t,e){return Math.hypot(t.X-e.X,t.Y-e.Y,t.Z-e.Z)}DistanceTo(t){return s.Distance(this,t)}static Equals(t,e){return i.Open3dMath.EpsilonEquals(t.X,e.X)&&i.Open3dMath.EpsilonEquals(t.Y,e.Y)&&i.Open3dMath.EpsilonEquals(t.Z,e.Z)}Equals(t){return s.Equals(this,t)}Transform(t){let e,n,i;const r=t.M;return e=r[0]*this.X+r[1]*this.Y+r[2]*this.Z+r[3],n=r[4]*this.X+r[5]*this.Y+r[6]*this.Z+r[7],i=r[8]*this.X+r[9]*this.Y+r[10]*this.Z+r[11],new s(e,n,i)}toString(){return`Point3d [${this.X}, ${this.Y}, ${this.Z}]`}}e.Point3d=s},200:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Polyline=void 0;const i=n(582),r=n(462),s=n(653),o=n(614),a=n(35),l=n(950),u=n(226);class h extends r.Point3dList{constructor(t){super(t)}get CenterPoint(){const t=this.Count;if(0===t)return a.Point3d.Origin;if(1===t)return this.Get(0);let e=a.Point3d.Origin,n=0;for(let i=0;i<t-1;i++){let t=this.Get(i),r=this.Get(i+1),s=t.DistanceTo(r);e=e.AddPoint(a.Point3d.AddPoint(t,r).Multiply(.5*s)),n+=s}return e=e.Divide(n),e}get IsValid(){if(this.Count<2)return!1;for(let t=1;t<this.Count;t++)if(this.Get(t).Equals(this.Get(t-1)))return!1;return!(this.Count<4&&this.IsClosed)}get SegmentCount(){return Math.max(0,this.Count-1)}get IsClosed(){return this.Count>2&&this.First.Equals(this.Last)}get Length(){if(this.Count<2)return 0;let t=0;for(let e=0;e<this.Count-1;e++)t+=this.Get(e).DistanceTo(this.Get(e+1));return t}IsClosedWithinTolerance(t){return!(this.Count<=2)&&this.First.DistanceTo(this.Last)<=t}PointAt(t){const e=this.Count;if(e<1)return a.Point3d.Origin;if(1==e)return this.First;const n=Math.floor(t);if(n<0)return this.Get(0);if(n>=e-1)return this.Get(e-1);if((t-=n)<=0)return this.Get(n);if(t>=1)return this.Get(n+1);const i=this.Get(n),r=this.Get(n+1);let s=1-t;return new a.Point3d(i.X==r.X?i.X:s*i.X+t*r.X,i.Y==r.Y?i.Y:s*i.Y+t*r.Y,i.Z==r.Z?i.Z:s*i.Z+t*r.Z)}SegmentAt(t){return t<0||t>=this.Count-1?null:(t=Math.floor(t),new i.Line(this.Get(t),this.Get(t+1)))}TangentAt(t){const e=this.Count;if(e<2)return u.Vector3d.Zero;let n=Math.floor(t);return n<0?n=0:n>=e-1&&(n=e-2),this.Get(n+1).SubtractPoint(this.Get(n)).Unitize()}Trim(t,e){let n=this.Count-1,i=Math.floor(t),r=Math.floor(e),s=t-i,o=e-r;s<0&&(s=0),s>=1&&(i++,s=0),o<0&&(o=0),o>=1&&(r++,o=0),i<0&&(i=0,s=0),i>=n&&(i=n,s=0),r<0&&(r=0,o=0),r>=n&&(r=n,o=0);const a=h.CreateFromPoints([this.PointAt(t)]);for(let t=i+1;t<=r;t++)a.Add(this.Get(t));return o>0&&a.Add(this.PointAt(e)),a}ClosestPoint(t){const e=this.ClosestParameter(t);return this.PointAt(e)}ClosestParameter(t){const e=this.Count;if(e<2)return 0;let n=0,r=0,s=Number.MAX_VALUE;for(let o=0;o<e-1;o++){const e=new i.Line(this.Get(o),this.Get(o+1));let a,l;e.Direction.IsTiny()?(l=0,a=this.Get(o).DistanceTo(t)):(l=e.ClosestParameter(t),l<=0?l=0:l>1&&(l=1),a=e.PointAt(l).DistanceTo(t)),a<s&&(s=a,r=l,n=o)}return n+r}GetSegments(){if(this.Count<2)return[];const t=[];for(let e=0;e<this.Count-1;e++)t.push(new i.Line(this.Get(e),this.Get(e+1)));return t}DeleteShortSegments(t=s.Open3d.EPSILON){const e=this.Count;if(e<3)return h.CreateFromPoints(this.items);const n=new Array(e);n[0]=!0,n[e-1]=!0;let i=0;for(let r=1;r<e-1;r++)this.Get(r).DistanceTo(this.Get(i))<=t?n[r]=!1:(i=r,n[r]=!0);for(let i=e-2;i>0;i--)if(n[i]){if(!(this.Get(i).DistanceTo(this.Get(e-1))<=t))break;n[i]=!1}const r=new Array(e);let o=0;for(let t=0;t<e;t++)n[t]&&(r[o]=this.Get(t),o++);return h.CreateFromPoints(r)}Smooth(t){const e=this.Count;if(e<3)return null;let n=e-1;t*=.5;const i=new Array(e);this.IsClosed?(i[0]=h.Smooth(this.Get(n-1),this.Get(0),this.Get(1),t),i[n]=i[0]):(i[0]=this.Get(0),i[n]=this.Get(n));for(let e=1;e<n;e++)i[e]=h.Smooth(this.Get(e-1),this.Get(e),this.Get(e+1),t);return h.CreateFromPoints(i)}IsPlanar(t=s.Open3d.EPSILON){const e=this.Count;if(e<3)return!1;const n=o.Plane.CreateFrom3Points(this.Get(0),this.Get(1),this.Get(2));for(let i=3;i<e;i++)if(!n.IsPointCoplanar(this.Get(i),t))return!1;return!0}TryGetPlane(t=s.Open3d.EPSILON){return this.IsPlanar(t)?o.Plane.CreateFrom3Points(this.Get(0),this.Get(1),this.Get(2)):null}TryGetArea(t=s.Open3d.EPSILON){if(this.IsPlanar()&&this.IsClosed){const e=this.TryGetPlane(t),n=this.Transform(l.Transform.PlaneToPlane(e,o.Plane.PlaneXY));return Math.abs(h.SignedPolygonArea(n))}return null}IsPointOn(t,e=s.Open3d.EPSILON){const n=this.Count;if(n<2)return!1;for(let r=0;r<n-1;r++)if(new i.Line(this.Get(r),this.Get(r+1)).IsPointOn(t,!0,e))return!0;return!1}IsPointInside(t,e=s.Open3d.EPSILON){if(!this.IsClosed)throw new Error("Polyline is not closed.");if(!this.IsPlanar(e))throw new Error("Polyline is not planar.");if(this.IsPointOn(t,e))return!1;const n=this.TryGetPlane(e);if(!n.IsPointCoplanar(t,e))return!1;const i=l.Transform.PlaneToPlane(n,o.Plane.PlaneXY),r=t.Transform(i);return this.Transform(i).IsPointInside2D(r)}IsPointInside2D(t){let e=this.Count,n=!1;for(let i=0,r=e-1;i<e;i++)this.Get(i).Y>t.Y!=this.Get(r).Y>t.Y&&t.X<(this.Get(r).X-this.Get(i).X)*(t.Y-this.Get(i).Y)/(this.Get(r).Y-this.Get(i).Y)+this.Get(i).X&&(n=!n),r=i;return n}Transform(t){const e=this.Map((e=>e.Transform(t)));return h.CreateFromPoints(e)}static CreateFromPoints(t){return new h(t)}static Smooth(t,e,n,i){const r=.5*(t.X+n.X),s=.5*(t.Y+n.Y),o=.5*(t.Z+n.Z),l=r===e.X?r:e.X+i*(r-e.X),u=s===e.Y?s:e.Y+i*(s-e.Y),h=o===e.Z?o:e.Z+i*(o-e.Z);return new a.Point3d(l,u,h)}static SignedPolygonArea(t){let e=0,n=t.Count;for(let i=0;i<n;i++){const r=t.Get(i),s=t.Get((i+1)%n);e+=r.X*s.Y-s.X*r.Y}return.5*e}}e.Polyline=h},950:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Transform=void 0;const i=n(561),r=n(35),s=n(226);class o{constructor(t){this.m=t}get Determinant(){const[t,e,n,i,r,s,o,a,l,u,h,c,d,P,m,p]=this.m;return i*(+d*u*o-l*P*o-d*s*h+r*P*h+l*s*m-r*u*m)+a*(+t*u*m-t*P*h+d*e*h-l*e*m+l*P*n-d*u*n)+c*(+t*P*o-t*s*m-d*e*o+r*e*m+d*s*n-r*P*n)+p*(-l*s*n-t*u*o+t*s*h+l*e*o-r*e*h+r*u*n)}get M(){return this.ToArray()}static get Identity(){return new o([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}get IsIdentity(){return this.Equals(o.Identity)}static get ZeroTransformation(){return new o([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1])}get IsZeroTransformation(){return this.Equals(o.ZeroTransformation)}Equals(t){const e=this.M,n=t.M;for(let t=0;t<16;t++)if(!i.Open3dMath.EpsilonEquals(e[t],n[t]))return!1;return!0}Clone(){return new o(this.M)}ToArray(){return[...this.m]}static MultiplyMatrix(t,e){const n=t.m,i=e.m,[r,s,a,l,u,h,c,d,P,m,p,f,Y,X,O,Z]=n,[A,g,M,T,C,I,w,E,L,y,b,D,v,G,x,F]=i;return new o([r*A+s*C+a*L+l*v,r*g+s*I+a*y+l*G,r*M+s*w+a*b+l*x,r*T+s*E+a*D+l*F,u*A+h*C+c*L+d*v,u*g+h*I+c*y+d*G,u*M+h*w+c*b+d*x,u*T+h*E+c*D+d*F,P*A+m*C+p*L+f*v,P*g+m*I+p*y+f*G,P*M+m*w+p*b+f*x,P*T+m*E+p*D+f*F,Y*A+X*C+O*L+Z*v,Y*g+X*I+O*y+Z*G,Y*M+X*w+O*b+Z*x,Y*T+X*E+O*D+Z*F])}MultiplyMatrix(t){return o.MultiplyMatrix(this,t)}static MultiplyScalar(t,e){const n=t.M;for(let t=0;t<16;t++)n[t]*=e;return new o(n)}MultiplyScalar(t){return o.MultiplyScalar(this,t)}static Rotation(t,e=s.Vector3d.ZAxis,n=r.Point3d.Origin){const i=s.Vector3d.CreateFromPoint3d(n),a=o.Translation(i.Reverse()),l=o.RotateAtOrigin(t,e),u=o.Translation(i);return o.CombineTransforms([a,l,u])}static RotateAtOrigin(t,e){const n=Math.cos(t),i=Math.sin(t),r=1-n;if(e.IsZero)throw new Error("Rotation axis should not be zero vector.");const s=(e=e.Unitize()).X,a=e.Y,l=e.Z,u=r*s,h=r*a;return new o([u*s+n,u*a-i*l,u*l+i*a,0,u*a+i*l,h*a+n,h*l-i*s,0,u*l-i*a,h*l+i*s,r*l*l+n,0,0,0,0,1])}static RotationX(t){return o.Rotation(t,s.Vector3d.XAxis)}static RotationY(t){return o.Rotation(t,s.Vector3d.YAxis)}static RotationZ(t){return o.Rotation(t,s.Vector3d.ZAxis)}static RotationZYX(t,e,n){const i=o.RotationZ(t),r=o.RotationY(e),s=o.RotationX(n);return o.CombineTransforms([s,r,i])}static Translation(t){return new o([1,0,0,t.X,0,1,0,t.Y,0,0,1,t.Z,0,0,0,1])}static Scale(t,e){const n=s.Vector3d.CreateFromPoint3d(t),i=o.Translation(n.Reverse()),r=o.ScaleAtOrigin(e,e,e),a=o.Translation(n);return o.CombineTransforms([i,r,a])}static CombineTransforms(t){const e=[...t];e.reverse();let n=o.Identity;for(let t=0;t<e.length;t++)n=n.MultiplyMatrix(e[t]);return n}static ScaleAtOrigin(t,e,n){return new o([t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1])}static PlanarProjection(t){let e=t.XAxis,n=t.YAxis,i=t.Origin;const r=e.X*e.X+n.X*n.X,s=e.X*e.Y+n.X*n.Y,a=e.X*e.Z+n.X*n.Z,l=e.Y*e.X+n.Y*n.X,u=e.Y*e.Y+n.Y*n.Y,h=e.Y*e.Z+n.Y*n.Z,c=e.Z*e.X+n.Z*n.X,d=e.Z*e.Y+n.Z*n.Y,P=e.Z*e.Z+n.Z*n.Z,m=i.X-r*i.X+s*i.Y+a*i.Z,p=i.Y-l*i.X+u*i.Y+h*i.Z,f=i.Z-c*i.X+d*i.Y+P*i.Z;return new o([r,s,a,m,l,u,h,p,c,d,P,f,0,0,0,1])}static Mirror(t){const e=t.Equation,n=t.Normal,i=n.Multiply(-2*e[3]),r=1-2*n.X*n.X,s=-2*n.X*n.Y,a=-2*n.X*n.Z,l=i.X,u=-2*n.Y*n.X,h=1-2*n.Y*n.Y,c=-2*n.Y*n.Z,d=i.Y,P=-2*n.Z*n.X,m=-2*n.Z*n.Y,p=1-2*n.Z*n.Z,f=i.Z;return new o([r,s,a,l,u,h,c,d,P,m,p,f,0,0,0,1])}static VectorToVector(t,e){const n=e.CrossProduct(t);let i=s.Vector3d.VectorAngle(t,e);return o.RotateAtOrigin(-i,n)}static worldXYToFrame(t,e,n,i){return new o([e.X,n.X,i.X,t.X,e.Y,n.Y,i.Y,t.Y,e.Z,n.Z,i.Z,t.Z,0,0,0,1])}static frameToFramePoint(t,e,n,i,r,s,o,a,l){const u=l.SubtractPoint(t),h=u.DotProduct(e),c=u.DotProduct(n),d=u.DotProduct(i);return r.Add(s.Multiply(h)).Add(o.Multiply(c)).Add(a.Multiply(d))}static frameToFrame(t,e,n,i,s,a,l,u){const h=o.frameToFramePoint(t,e,n,i,s,a,l,u,new r.Point3d(0,0,0)),c=o.frameToFramePoint(t,e,n,i,s,a,l,u,new r.Point3d(1,0,0)),d=o.frameToFramePoint(t,e,n,i,s,a,l,u,new r.Point3d(0,1,0)),P=o.frameToFramePoint(t,e,n,i,s,a,l,u,new r.Point3d(0,0,1));return o.worldXYToFrame(h,c.SubtractPoint(h),d.SubtractPoint(h),P.SubtractPoint(h))}static PlaneToPlane(t,e){return o.frameToFrame(t.Origin,t.XAxis,t.YAxis,t.ZAxis,e.Origin,e.XAxis,e.YAxis,e.ZAxis)}Transpose(){const t=this.M;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,new o(t)}TryGetInverse(){const t=this.M,[e,n,i,r,s,a,l,u,h,c,d,P,m,p,f,Y]=this.m,X=c*f*u-p*d*u+p*l*P-a*f*P-c*l*Y+a*d*Y,O=m*d*u-h*f*u-m*l*P+s*f*P+h*l*Y-s*d*Y,Z=h*p*u-m*c*u+m*a*P-s*p*P-h*a*Y+s*c*Y,A=m*c*l-h*p*l-m*a*d+s*p*d+h*a*f-s*c*f,g=e*X+n*O+i*Z+r*A;if(0===g)return null;const M=1/g;return t[0]=X*M,t[1]=(p*d*r-c*f*r-p*i*P+n*f*P+c*i*Y-n*d*Y)*M,t[2]=(a*f*r-p*l*r+p*i*u-n*f*u-a*i*Y+n*l*Y)*M,t[3]=(c*l*r-a*d*r-c*i*u+n*d*u+a*i*P-n*l*P)*M,t[4]=O*M,t[5]=(h*f*r-m*d*r+m*i*P-e*f*P-h*i*Y+e*d*Y)*M,t[6]=(m*l*r-s*f*r-m*i*u+e*f*u+s*i*Y-e*l*Y)*M,t[7]=(s*d*r-h*l*r+h*i*u-e*d*u-s*i*P+e*l*P)*M,t[8]=Z*M,t[9]=(m*c*r-h*p*r-m*n*P+e*p*P+h*n*Y-e*c*Y)*M,t[10]=(s*p*r-m*a*r+m*n*u-e*p*u-s*n*Y+e*a*Y)*M,t[11]=(h*a*r-s*c*r-h*n*u+e*c*u+s*n*P-e*a*P)*M,t[12]=A*M,t[13]=(h*p*i-m*c*i+m*n*d-e*p*d-h*n*f+e*c*f)*M,t[14]=(m*a*i-s*p*i-m*n*l+e*p*l+s*n*f-e*a*f)*M,t[15]=(s*c*i-h*a*i+h*n*l-e*c*l-s*n*d+e*a*d)*M,new o(t)}toString(){const[t,e,n,i,r,s,o,a,l,u,h,c,d,P,m,p]=this.m;return`R0=(${t}, ${r}, ${l}, ${d}), R1=(${e}, ${s}, ${u}, ${P}), R2=(${n}, ${o}, ${h}, ${m}), R3=(${i}, ${a}, ${c}, ${p})`}}e.Transform=o},226:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.Vector3d=void 0;const i=n(653),r=n(561),s=n(35),o=n(950);class a{constructor(t,e,n){this.X=t,this.Y=e,this.Z=n}static CreateFromVector(t){return new a(t.X,t.Y,t.Z)}static CreateFromPoint3d(t){return new a(t.X,t.Y,t.Z)}get IsUnitVector(){return r.Open3dMath.EpsilonEquals(this.Length,1)}get IsZero(){return r.Open3dMath.EpsilonEquals(this.X,0)&&r.Open3dMath.EpsilonEquals(this.Y,0)&&r.Open3dMath.EpsilonEquals(this.Z,0)}get Length(){return Math.hypot(this.X,this.Y,this.Z)}static Add(t,e){return new a(t.X+e.X,t.Y+e.Y,t.Z+e.Z)}static AddToPoint(t,e){return new s.Point3d(t.X+e.X,t.Y+e.Y,t.Z+e.Z)}Add(t){return a.Add(this,t)}AddToPoint(t){return a.AddToPoint(this,t)}static Subtract(t,e){return new a(t.X-e.X,t.Y-e.Y,t.Z-e.Z)}Subtract(t){return a.Subtract(this,t)}static Multiply(t,e){return new a(t.X*e,t.Y*e,t.Z*e)}Multiply(t){return a.Multiply(this,t)}static Divide(t,e){if(0===e)throw new Error("Division by zero");const n=1/e;return new a(t.X*n,t.Y*n,t.Z*n)}Divide(t){return a.Divide(this,t)}static Interpolate(t,e,n){return new a(t.X+(e.X-t.X)*n,t.Y+(e.Y-t.Y)*n,t.Z+(e.Z-t.Z)*n)}static DotProduct(t,e){return t.X*e.X+t.Y*e.Y+t.Z*e.Z}DotProduct(t){return a.DotProduct(this,t)}static CrossProduct(t,e){return new a(t.Y*e.Z-e.Y*t.Z,t.Z*e.X-e.Z*t.X,t.X*e.Y-e.X*t.Y)}CrossProduct(t){return a.CrossProduct(this,t)}static Distance(t,e){return e.Subtract(t).Length}DistanceTo(t){return a.Distance(this,t)}static Equals(t,e){return r.Open3dMath.EpsilonEquals(t.X,e.X)&&r.Open3dMath.EpsilonEquals(t.Y,e.Y)&&r.Open3dMath.EpsilonEquals(t.Z,e.Z)}Equals(t){return a.Equals(this,t)}static VectorAngle(t,e){if(t.IsZero||e.IsZero)throw new Error("Cannot compute angle of zero-length vector.");let n=a.DotProduct(t,e)/(t.Length*e.Length);return n=r.Open3dMath.Clamp(n,-1,1),Math.acos(n)}VectorAngle(t){return a.VectorAngle(this,t)}static Reverse(t){return new a(-t.X,-t.Y,-t.Z)}Reverse(){return a.Reverse(this)}static Unitize(t){var e=t.Length;if(0===e)throw new Error("Cannot unitize a zero-length vector.");return new a(t.X/e,t.Y/e,t.Z/e)}Unitize(){return a.Unitize(this)}IsTiny(t=i.Open3d.EPSILON){return Math.abs(this.X)<t&&Math.abs(this.Y)<t&&Math.abs(this.Z)<t}static IsParallel(t,e){if(t.IsZero||e.IsZero)return i.Open3d.ParallelIndicator.Parallel;const n=a.VectorAngle(t,e);return r.Open3dMath.EpsilonEquals(n,0,i.Open3d.ANGLE_EPSILON)?i.Open3d.ParallelIndicator.Parallel:r.Open3dMath.EpsilonEquals(n,Math.PI,i.Open3d.ANGLE_EPSILON)?i.Open3d.ParallelIndicator.AntiParallel:i.Open3d.ParallelIndicator.NotParallel}IsParallelTo(t){return a.IsParallel(this,t)}static IsPerpendicular(t,e){if(t.IsZero||e.IsZero)return!0;const n=a.VectorAngle(t,e);return!!r.Open3dMath.EpsilonEquals(n,Math.PI/2,i.Open3d.ANGLE_EPSILON)||!!r.Open3dMath.EpsilonEquals(n,-Math.PI/2,i.Open3d.ANGLE_EPSILON)}IsPerpendicularTo(t){return a.IsPerpendicular(this,t)}VectorRotate(t,e){const n=o.Transform.RotateAtOrigin(t,e);return this.Transform(n)}GetPerpendicularVector(){let t,e,n,i,r;n=2,Math.abs(this.Y)>Math.abs(this.X)?Math.abs(this.Z)>Math.abs(this.Y)?(t=2,e=1,n=0,i=this.Z,r=-this.Y):Math.abs(this.Z)>=Math.abs(this.X)?(t=1,e=2,n=0,i=this.Y,r=-this.Z):(t=1,e=0,n=2,i=this.Y,r=-this.X):Math.abs(this.Z)>Math.abs(this.X)?(t=2,e=0,n=1,i=this.Z,r=-this.X):Math.abs(this.Z)>Math.abs(this.Y)?(t=0,e=2,n=1,i=this.X,r=-this.Z):(t=0,e=1,n=2,i=this.X,r=-this.Y);let s=[0,0,0];return s[t]=r,s[e]=i,s[n]=0,new a(s[0],s[1],s[2]).Unitize()}Transform(t){let e,n,i;const r=t.M;return r[3]=0,r[7]=0,r[11]=0,e=r[0]*this.X+r[1]*this.Y+r[2]*this.Z+r[3],n=r[4]*this.X+r[5]*this.Y+r[6]*this.Z+r[7],i=r[8]*this.X+r[9]*this.Y+r[10]*this.Z+r[11],new a(e,n,i)}toString(){return`Vector3d [${this.X}, ${this.Y}, ${this.Z}]`}}e.Vector3d=a,a.XAxis=new a(1,0,0),a.YAxis=new a(0,1,0),a.ZAxis=new a(0,0,1),a.Zero=new a(0,0,0)}},e={};function n(i){var r=e[i];if(void 0!==r)return r.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,n),s.exports}var i={};return(()=>{var t=i;Object.defineProperty(t,"__esModule",{value:!0}),t.Open3d=t.Open3dMath=t.Intersection=t.Transform=t.Plane=t.Polyline=t.Line=t.Point3d=t.Vector3d=void 0;var e=n(226);Object.defineProperty(t,"Vector3d",{enumerable:!0,get:function(){return e.Vector3d}});var r=n(35);Object.defineProperty(t,"Point3d",{enumerable:!0,get:function(){return r.Point3d}});var s=n(582);Object.defineProperty(t,"Line",{enumerable:!0,get:function(){return s.Line}});var o=n(200);Object.defineProperty(t,"Polyline",{enumerable:!0,get:function(){return o.Polyline}});var a=n(614);Object.defineProperty(t,"Plane",{enumerable:!0,get:function(){return a.Plane}});var l=n(950);Object.defineProperty(t,"Transform",{enumerable:!0,get:function(){return l.Transform}});var u=n(465);Object.defineProperty(t,"Intersection",{enumerable:!0,get:function(){return u.Intersection}});var h=n(561);Object.defineProperty(t,"Open3dMath",{enumerable:!0,get:function(){return h.Open3dMath}});var c=n(653);Object.defineProperty(t,"Open3d",{enumerable:!0,get:function(){return c.Open3d}})})(),i})()));