using UnityEngine;

// Horizontal camera-relative parallax. 1 = fixed world geometry, 0 = camera-locked.
// Does not change render pipeline, camera settings, or gameplay physics.
public sealed class HangarParallaxLayer : MonoBehaviour
{
    public Camera targetCamera;
    [Range(0f, 1f)] public float scrollFactor = 0.35f;
    public float pixelsPerUnit = 100f;
    private Vector3 startPosition;
    private float startCameraX;
    private bool initialized;

    private void Start() { Rebase(); }
    public void Rebase()
    {
        if (!targetCamera) targetCamera = Camera.main;
        if (!targetCamera) { initialized = false; return; }
        startPosition = transform.position;
        startCameraX = targetCamera.transform.position.x;
        initialized = true;
    }
    private void LateUpdate()
    {
        if (!targetCamera) return;
        if (!initialized) Rebase();
        float shift = (targetCamera.transform.position.x - startCameraX) * (1f - scrollFactor);
        if (pixelsPerUnit > 0f) shift = Mathf.Round(shift * pixelsPerUnit) / pixelsPerUnit;
        transform.position = startPosition + Vector3.right * shift;
    }
}
