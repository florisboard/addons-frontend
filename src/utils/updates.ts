function isProvidedVersionNewer(providedVersion: string, previousVersion: string): boolean {
  if (providedVersion === previousVersion) {
    return false;
  }

  const providedVersionParts = providedVersion.split('.');
  const previousVersionParts = previousVersion.split('.');

  for (let index = 0; index < providedVersionParts.length; index++) {
    const part = parseInt(providedVersionParts[index], 10);
    const prevPart = parseInt(previousVersionParts[index], 10);

    if (isNaN(part) || isNaN(prevPart)) {
      return false;
    }

    if (part > prevPart) {
      return true;
    }

    if (part < prevPart) {
      return false;
    }
  }

  return true;
}

export function hasNewVersion(
  currentVersion: string | undefined,
  releaseVersion: string | undefined,
) {
  if (!currentVersion || !releaseVersion) return false;
  if (currentVersion === releaseVersion) return false;
  return isProvidedVersionNewer(releaseVersion, currentVersion);
}
