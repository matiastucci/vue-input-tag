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

  describe('validate="text"', () => {
    const vmValidation = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag validate="text"><input-tag/>',
    });

    const InputTagTextOnly = vmValidation.$children[0];

    it('should only add text values', () => {
      InputTagTextOnly.addNew('foo');
      InputTagTextOnly.addNew('123');
      InputTagTextOnly.addNew('mati@tucci.me');
      InputTagTextOnly.addNew('https://tucci.me');
      InputTagTextOnly.addNew('2002-04-03');
      expect(InputTagTextOnly.tags).to.have.length(1);
    });
  });

  describe('validate="digits"', () => {
    const vmValidation = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag validate="digits"><input-tag/>',
    });

    const InputTagDigitsOnly = vmValidation.$children[0];

    it('should only add digits values', () => {
      InputTagDigitsOnly.addNew('foo');
      InputTagDigitsOnly.addNew('123');
      InputTagDigitsOnly.addNew('mati@tucci.me');
      InputTagDigitsOnly.addNew('https://tucci.me');
      expect(InputTagDigitsOnly.tags).to.have.length(1);
    });
  });

  describe('validate="email"', () => {
    const vmValidation = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag validate="email"><input-tag/>',
    });

    const InputTagEmailOnly = vmValidation.$children[0];

    it('should only add text values', () => {
      InputTagEmailOnly.addNew('foo');
      InputTagEmailOnly.addNew('123');
      InputTagEmailOnly.addNew('mati@tucci.me');
      InputTagEmailOnly.addNew('https://tucci.me');
      InputTagEmailOnly.addNew('2002-04-03');
      expect(InputTagEmailOnly.tags).to.have.length(1);
    });
  });

  describe('validate="url"', () => {
    const vmValidation = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag validate="url"><input-tag/>',
    });

    const InputTagUrlOnly = vmValidation.$children[0];

    it('should only add text values', () => {
      InputTagUrlOnly.addNew('foo');
      InputTagUrlOnly.addNew('123');
      InputTagUrlOnly.addNew('mati@tucci.me');
      InputTagUrlOnly.addNew('https://tucci.me');
      InputTagUrlOnly.addNew('2002-04-03');
      expect(InputTagUrlOnly.tags).to.have.length(1);
    });
  });

  describe('validate="isodate"', () => {
    const vmValidation = new Vue({
      el: document.createElement('div'),
      components: { InputTag },
      template: '<input-tag validate="isodate"><input-tag/>',
    });

    const InputTagISODateOnly = vmValidation.$children[0];

    it('should only add text values', () => {
      InputTagISODateOnly.addNew('foo');
      InputTagISODateOnly.addNew('123');
      InputTagISODateOnly.addNew('mati@tucci.me');
      InputTagISODateOnly.addNew('https://tucci.me');
      InputTagISODateOnly.addNew('2002-04-03');
      expect(InputTagISODateOnly.tags).to.have.length(1);
    });
  });
});
