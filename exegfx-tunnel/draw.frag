#version 130
#define iResolution gl_TexCoord[0]
#define iTime gl_TexCoord[0].z
#define pi acos(-1.)

float sdBox( vec3 p, vec3 b )
{
    p=abs(p)-b;
    return max(max(p.x,p.y),p.z);
}

vec2 hash2( const float n ) {
	return fract(sin(vec2(n,n+1.))*vec2(43758.5453123));
}

bool m;
float scene(vec3 p)
{
	vec3 a=vec3(0,0,18.9),b=vec3(1.1,2,20);
	float diff=-min(sdBox(p+a,b),sdBox(p+a.zyx,b.zyx));
	float lite=sdBox(p+vec3(3,0,0),vec3(1,2,1));
	m=lite<diff;
	return min(lite,diff);
}

vec2 rv2;
vec3 B(vec3 n) {
	float theta = 2*pi*rv2.x;
	float phi = acos(1-2*rv2.y);
	vec3 a = normalize(vec3(
		sin(phi) * cos(theta),
		sin(phi) * sin(theta),
		cos(phi)
	));
	return a*sign(dot(a,n));
}

vec3 trace(vec3 h, vec3 dir)
{
    vec3 accum = vec3(1);
    for(int bounce=0;bounce++<10;)
    {
        float k=1;
        for(int i=0;i++<100&&abs(k)>.001;)
            k = scene(h),
            h += dir*k;
			
        // if we hit something
        if(abs(k)<.001)
        {
            if (m)
                return accum*vec3((ivec3(7,25,31)>>int(abs(h.y*2.5)))&1);
            
			vec3 o = vec3(.001, 0,0),n = normalize(vec3(
				scene(h+o.xyy)-scene(h-o.xyy),
				scene(h+o.yxy)-scene(h-o.yxy),
				scene(h+o.yyx)-scene(h-o.yyx)
			));

            h +=n*.01;
            dir = B(n);
            accum *= dot(dir,n);
        }
		
        rv2 = hash2(rv2.y+rv2.x);
    }
    
    return vec3(0);
}






void main()
{
	vec2 uv = gl_FragCoord.xy/iResolution.xy-.5;

	float seed = iTime+(uv.x+iResolution.x*uv.y)*1.51269341231;
	rv2 = hash2( 24.4316544311+iTime+seed );

	uv += (rv2-.5)/iResolution.xy;

	uv.x*=iResolution.x/iResolution.y;

	gl_FragColor.rgb=trace(vec3(0,0,-12),normalize(vec3(uv,1)));
}