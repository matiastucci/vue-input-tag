import Vue from 'vue';
import InputTag from 'src/InputTag';

describe('InputTag.vue', () => {
  const vm = new Vue({
    el: document.createElement('div'),
    components: { InputTag },
    template: '<input-tag><input-tag/>',
  });

  const InputTagComponent = vm.$children[0];

  beforeEach((cb) => {
    InputTagComponent.tags.length = 0;
    cb();
  });

  it('should have a new tag input', () => {
    expect(InputTagComponent.$el.querySelector('input.new-tag')).not.to.equal(null);
  });

  it('shouldn\'t have a placeholder', () => {
    expect(InputTagComponent.$el.querySelector('input.new-tag').placeholder).to.equal('');
  });

  describe('addNew()', () => {
    it('should add a new tag', () => {
      InputTagComponent.addNew('foo bar');
      InputTagComponent.addNew('foo');
      InputTagComponent.addNew('bar');
      expect(InputTagComponent.tags).to.have.length(3);
    });
  });

  describe('remove(index)', () => {
    it('should remove a tag', () => {
      InputTagComponent.addNew('foo bar');
      InputTagComponent.addNew('foo');
      InputTagComponent.addNew('bar');
      InputTagComponent.remove(0);
      expect(InputTagComponent.tags).to.have.length(2);
    });
  });

  describe('removeLastTag()', () => {
    it('should remove the last tag', () => {
      InputTagComponent.addNew('foo bar');
      InputTagComponent.addNew('foo');
      InputTagComponent.addNew('bar');
      InputTagComponent.removeLastTag();
      expect(InputTagComponent.tags).to.have.length(2);
    });
  });

  describe('read-only="true"', () => {
    const vmReadOnly = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag :read-only="true"><input-tag/>',
    });

    const InputTagComponentReadOnly = vmReadOnly.$children[0];

    it('should have a read-only CSS class', () => {
      expect(InputTagComponentReadOnly.$el.className).to.contain('read-only');
    });

    it('shouldn\'t have a new tag input', () => {
      expect(InputTagComponentReadOnly.$el.querySelector('input.new-tag')).to.equal(null);
    });

    it('shouldn\'t have a remove tag button', () => {
      expect(InputTagComponentReadOnly.$el.querySelector('a.remove')).to.equal(null);
    });
  });

  describe('tags="[1,2,3]"', () => {
    const vmWithTags = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag :tags="[\'Jerry\', \'Kramer\', \'Elaine\']"><input-tag/>',
    });

    const InputTagComponentWithTags = vmWithTags.$children[0];

    it('should load the tags', () => {
      expect(InputTagComponentWithTags.tags).to.have.length(3);
    });

    it('should have remove buttons', () => {
      expect(InputTagComponentWithTags.$el.querySelectorAll('a.remove')).to.have.length(3);
    });
  });

  describe('placeholder="Add Tag"', () => {
    const vmWithPlaceholder = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag placeholder="Add Tag"><input-tag/>',
    });

    const InputTagComponentWithPlaceholder = vmWithPlaceholder.$children[0];

    it('should have a placeholder', () => {
      expect(InputTagComponentWithPlaceholder.$el.querySelector('input.new-tag').placeholder).to.equal('Add Tag');
    });
  });
});
