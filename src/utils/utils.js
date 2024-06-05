export function checkImages(urls) {
  return urls.map(item => (
    new Promise((resolve, reject) => {
      const img = new Image()
      img.src = item
      img.onload = function() {
        if (this.width > 2) {
          return resolve({status: true, url: this.src})
        }
        else {
          return resolve({status: false, url: this.src})
        }
      }
      img.onerror = function() {
        return resolve({status: false, url: this.src})
      }
    })
  ))
}