const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  company: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  website: {
    type: String
  },
  skills: {
    type: [String],
    required: true
  },
  bio: {
    type: String
  },
  githubuser: {
    type: String
  },
  experience: [
    {
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      location: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],

  social: {
    linkedin: {
      type: String
    },
    github: {
      type: String
    },
    instagram: {
      type: String
    },
    facebook: {
      type: String
    },
    twitter: {
      type: String
    },
    youtube: {
      type: String
    },
    medium: {
      type: String
    },
    stackoverflow: {
      type: String
    }
  }
});
