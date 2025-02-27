import execa from "execa";

export function install(
  packageInfo: Record<string, string>,
  options?: Record<string, any>
) {
  const packageList = getPackageList(packageInfo);

  const args = ["install"];

  const npmOptions = ["--prefer-offline", "--no-audit", "--progress=false"];

  return execa("npm", [...args, ...packageList, ...npmOptions], {
    cwd: options?.cwd || process.cwd(),
  });
}

export function getPackageList(
  packages: Record<string, string>
): Array<string> {
  if (Array.isArray(packages)) {
    return packages.filter((pkg) => typeof pkg === "string");
  }

  const entries = Object.entries(packages);

  return entries
    .filter(([name, version]) => {
      return (
        (typeof name === "string" && typeof version === "string") ||
        typeof version === "undefined"
      );
    })
    .map(([name, version]) => {
      return version ? `${name}@${version}` : name;
    });
}
