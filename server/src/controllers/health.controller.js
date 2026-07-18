export function getHealth(_req, res) {
  res.status(200).json({
    success: true,
    service: 'neural-math-lab-server',
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
}