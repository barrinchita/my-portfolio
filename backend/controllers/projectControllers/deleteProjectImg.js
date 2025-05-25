import SftpClient from "ssh2-sftp-client";
import dotenv from 'dotenv';

dotenv.config();

const sftp = new SftpClient();

const sftpConfig = {
  host: process.env.VPS_HOST,
  username: process.env.VPS_USER,
  password: process.env.VPS_PASS,
};

const REMOTE_IMAGE_DIR = '/home/barrinchita/repos/portfolioImages';

const deleteProjectImg =  async (req, res) => {
  const filename = req.params.filename;
  const remoteFilePath = `${REMOTE_IMAGE_DIR}/${filename}`;

  try {
    await sftp.connect(sftpConfig);
    const exists = await sftp.exists(remoteFilePath);

    if (!exists) {
      return res.status(404).json({ status: false, error: 'Image not found on VPS' });
    }

    await sftp.delete(remoteFilePath);
    res.status(201).json({ status: true, message: `Image '${filename}' deleted successfully.` });
  } catch (err) {
    console.error('SFTP delete error:', err.message);
    res.status(500).json({ status: false, error: 'Failed to delete image on VPS' });
  } finally {
    sftp.end();
  }
};

export default deleteProjectImg