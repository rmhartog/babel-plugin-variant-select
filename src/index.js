export default function({ types: t }) {
  return {
    visitor: {
      MemberExpression(path) {
        if (!t.isIdentifier(path.node.object) ||
            path.node.object.name !== "Variant" ||
            path.scope.hasBinding("Variant")) {
          return;
        }
        if (!t.isIdentifier(path.node.property) ||
            path.node.property.name !== "select") {
          throw path.buildCodeFrameError("Variant does not have this member, did you mean Variant.select?");
        }
        if (!t.isCallExpression(path.parent)) {
          throw path.buildCodeFrameError("Variant.select can only be called directly.");
        }
        const args = path.parent.arguments;
        if (args.length !== 2) {
          throw path.buildCodeFrameError("Variant.select must receive exactly 2 arguments.");
        }
        const variantNameNode = args[0];
        if (!t.isStringLiteral(variantNameNode)) {
          throw path.buildCodeFrameError("The first argument of Variant.select must be a string literal.");
        }
        const variantName = variantNameNode.value;
        const variants = args[1];
        if (!t.isObjectExpression(variants)) {
          throw path.buildCodeFrameError("The second argument of Variant.select must be an object literal.");
        }
        const variantValue = process.env[`VARIANT_${variantName}`] || "default";
        const properties = variants.properties.filter((property) =>
          t.isProperty(property) && t.isIdentifier(property.key) && property.key.name === variantValue
        );
        if (properties.length !== 1) {
          throw path.buildCodeFrameError(`Argument of Variant.select does not contain key for ${variantName} value of ${variantValue}.`);
        }
        path.parentPath.replaceWith(properties[0].value);
      }
    }
  };
}
