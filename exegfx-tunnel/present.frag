#version 120
uniform sampler2D T;
void main(){
	vec2 uv=gl_FragCoord.xy/gl_TexCoord[0].xy;
	vec4 tex = texture2D(T,uv)*3./gl_TexCoord[0].z;
	uv-=.5;
	gl_FragColor=pow(tex*(1-dot(uv,uv)), vec4(.45));
}