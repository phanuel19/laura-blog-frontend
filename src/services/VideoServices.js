import Axios from "axios";
class VideoServices {
  server = "http://localhost:5000"
  constructor() {
    this.routes = {
      getVideo: '/api/v1/videos',
      addVideo: '/api/v1/addVideo',
      getVideoById: '/api/v1/getVideo/',
      updateVideo: '/api/v1/updateVideo/',
      deleteVideo: '/api/v1/deleteVideo/',
    }
    this.status = 200
  }

  async AddVideo(video){
    Axios.post(this.server + this.routes.addVideo, video)
      .then(response => {
        this.status = response.status;
        return response.data;
        
      })
      .catch(error => {
        console.error('Error adding video:', error);
        this.status = error.response ? error.response.status : 500;
      });
  }
  async GetVideos() {
    try {
      const response = await Axios.get(this.server + this.routes.getVideo);
      this.status = response.status;
      return response.data
    } catch (error) {
      console.error('Error fetching videos:', error);
      this.status = error.response ? error.response.status : 500;
      return [];
    }
  }
}

export const video = new VideoServices();