export default class MultiTree {
  constructor(value) {
    this.value = value;
    this.children = null;
    this.parent = null;
  }

  getChildren() {
    return this.children;
  }

  getParent() {
    return this.parent;
  }

  hasChildren() {
    return this.children && this.children.length > 0;
  }

  findChildren(value) {
    if (!this.children) return null;
    this.children.forEach(child => {
      if (child.value === value) {
        return child;
      }
    });
    return null;
  }

  addChildren(value) {
    const childTree = new MultiTree(value);
    childTree.parent = this;
    const children = this.children || [];
    children.push(childTree);
  }

  findWord(word) {
    let words = word;
    if (typeof word === 'string') {
      words = Array.from(word);
    }
    if (words.length === 0) return null;
    const char = words.pop();
    const result = this.findChildren(char);
    if (result === null) return null;
    return result.findChildren(words.slice(1, words.length));
  }
}
