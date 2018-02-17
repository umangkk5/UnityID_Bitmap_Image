var First_URL = 'https://www.random.org/integers/?num=10000&min=0&max=16384&col=1&base=10&format=plain&rnd=new';
var Second_URL = 'https://www.random.org/integers/?num=6384&min=0&max=16384&col=1&base=10&format=plain&rnd=new';

fetch(First_URL)
  .then(response1 => response1.text())
  .then(response1 => {
    return fetch(First_URL)
      .then(response2 => response2.text())
      .then(response2 => response1 + response2)
      .then(result => result.trim().split('\n'))
  })
  .then(function (result) {
		  const canvas = document.getElementById('canvas_image');
		  const data_content = canvas.getContext('2d');

		  
		  var canvas_height =128 ;
		  var canvas_width = 128 ;
		  var clamped_array = new Uint8ClampedArray(canvas_height * canvas_width * 4);

		  for (height = 0; height < canvas_height; height++) {
		    for (width = 0; width < canvas_width; width++) {
		      index = (( canvas_width * height ) + width) * 4;
		      for (j = 0; j < 4; j++) {
		        clamped_array[index + j] = Math.floor(result[height*width]/(j+1)) % 256;
		      }
		    }
		  }
		  console.log("clamped_array " + clamped_array);
		  var image_data = data_content.createImageData(canvas_height, canvas_width);
		  image_data.data.set(clamped_array);
		  data_content.putImageData(image_data, 0, 0);
		  console.log("Completed")
   })
   .catch(console.log)