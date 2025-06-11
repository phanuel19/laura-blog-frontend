import Axios from "axios";

class VideoServices {
  server =import.meta.env.SERVER

  constructor() {
    this.routes = {
      getVideo: '/api/v1/videos',
      addVideo: '/api/v1/videos',
      getVideoById: '/api/v1/videos/:id',
      updateVideo: '/api/v1/videos/:id',
      deleteVideo: '/api/v1/videos/:id',
    };
    this.status = 200;
  }

  async get(endpoint, params = {}) {
    try {
      const response = await Axios.get(this.server + endpoint, { params });
      this.status = response.status;
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async post(endpoint, data) {
    try {
      const response = await Axios.post(this.server + endpoint, data);
      this.status = response.status;
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async put(endpoint, data) {
    try {
      const response = await Axios.put(this.server + endpoint, data);
      this.status = response.status;
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  async delete(endpoint) {
    try {
      const response = await Axios.delete(this.server + endpoint);
      this.status = response.status;
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  handleError(error) {
    console.error('API Error:', error);
    this.status = error.response?.status || 500;
  }

  // CRUD Operations
  async AddVideo(video) {
    return this.post(this.routes.addVideo, video);
  }

  async GetVideos() {
    return await this.get(this.routes.getVideo);
  }

  async GetVideoById(id) {
    const endpoint = this.routes.getVideoById.replace(':id', id);
    return this.get(endpoint);
  }

  async UpdateVideo(id, video) {
    const endpoint = this.routes.updateVideo.replace(':id', id);
    return this.put(endpoint, video);
  }

  async DeleteVideo(id) {
    const endpoint = this.routes.deleteVideo.replace(':id', id);
    return this.delete(endpoint);
  }
}

export const video = new VideoServices();