/* File generated with Shader Minifier 1.1.6
 * http://www.ctrl-alt-test.fr
 */
#ifndef FRAG_PRESENT_H_
# define FRAG_PRESENT_H_
# define VAR_T "m"

const char *present_frag =
 "#version 120\n"
 "uniform sampler2D m;"
 "void main()"
 "{"
   "vec2 v=gl_FragCoord.xy/gl_TexCoord[0].xy;"
   "vec4 r=texture2D(m,v)*3./gl_TexCoord[0].z;"
   "v-=.5;"
   "gl_FragColor=pow(r*(1-dot(v,v)),vec4(.45));"
 "}";

#endif // FRAG_PRESENT_H_
