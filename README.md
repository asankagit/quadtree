![Chemeleon](demo.png)
# Chameleon

Light weight image uitll with custom shader support


### dev build
`npx webpack --mode development`


### package local build
`npm pack`

### Generate .d.ts files from *.js
`npx tsc --declaration --outDir dist src/*.js src/**/*.js --allowJs`

### Usage
```
import shaderBinder, {FlatGray,GrayScale} from '@asanka-npm/chameleon';
import img from "path/to/your/image"
  ...
const FLatAndGrayRender = ({ width, src, height, }) => {
  const canvasRef = useRef(null);

  const setUpContext = (canvas, name) => {
    FlatGray(name, canvas);
  };

  useEffect(() => {
      const canvas = canvasRef.current;
      if (canvas) {
          setUpContext(canvas, src);
      }
  }, []);

  return <canvas ref={canvasRef}  width={width} height={height}/>;
};
 ...

 return (
    ...
   <FLatAndGrayRender src={img} width={400} height={400}/>
    ...
 )
 ...
```

