const generationErrorHandler = (error, message, postTitle) => {
  // This is run as a systemd service in production, with stdout/stderr logged in syslog with an identifier.
  // The awesome part is we can just use console.log() and console.error() rather than some more complicated solution
  console.log(
    `Failed to generate blog post ${message} for post titled: ${postTitle}`
  );
  console.error(error);
};

module.exports = generationErrorHandler;
