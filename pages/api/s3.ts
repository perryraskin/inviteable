const aws = require("aws-sdk")
const bucket = "inviteable"
const region = "us-east-1"
const accessKeyId = process.env.INV_AWS_ACCESS_KEY
const secretAccessKey = process.env.INV_AWS_SECRET_KEY

aws.config.update({ region, accessKeyId, secretAccessKey })

export default async function(req, res) {
  const { objectName, contentType } = req.query
  // console.log(req.query)

  try {
    const s3 = new aws.S3()

    const s3Param = {
      Bucket: bucket,
      Key: objectName,
      Expires: 500,
      ContentType: contentType,
      ACL: "public-read"
    }

    s3.getSignedUrl("putObject", s3Param, (err, data) => {
      if (err) {
        console.log(err)
        res.json({ success: false, error: err })
      }
      res.status(200).json({
        success: true,
        signedUrl: data,
        uploadUrl: `https://${bucket}.s3.amazonaws.com/images/${objectName}`
      })
    })
  } catch (err) {
    res.status(400)
    res.json({ error: err.message })
  } finally {
  }
}
