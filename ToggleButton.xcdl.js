//==============================================================================
//	개발중인 Compostie Component의 Component Class에 대한 정의를 작성합니다.
//  참고: https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_switch
//  속성
//  - toggleType: ToggleButton의 모양 지정. 기본값은 "rectangle", "rectangle | rounded"
//  - toggleOnColor: value 값이 true인 경우의 배경색
//  - toggleOffColor: value 값이 false인 경우의 배경색
//  - value: 선택된 상태값
//==============================================================================
//==============================================================================
// Object : nexacro.ToggleButton
// Group : Component
//==============================================================================
if (!nexacro.ToggleButton)
{
	//==============================================================================
	// nexacro.ToggleButton
	//==============================================================================
	nexacro.ToggleButton = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
	{
		nexacro._CompositeComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this.addEvent("canchange");
		this.addEvent("onchanged");
	};
	
	var _pToggleButton = nexacro._createPrototype(nexacro._CompositeComponent, nexacro.ToggleButton);
	nexacro.ToggleButton.prototype = _pToggleButton;
	_pToggleButton._type_name = "ToggleButton";
	
	_pToggleButton.value = false;
	_pToggleButton.toggleType = "rectangle";
	_pToggleButton.toggleOnColor = "#2196F3";	
	_pToggleButton.toggleOffColor = "#CCCCCC";	
	
	/* accessibility */
	_pToggleButton.accessibilityrole = "form";
	
	_pToggleButton.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp) {
		if (!this.enable) {
			return false;
		}
		
		var pre_val = this.value;
		var post_val;
		if (this._isChecked(pre_val)) {
			post_val = false;
		}
		else {
			post_val = true;
		}
		
		var ret = this.on_fire_canchange(this, pre_val, post_val);
		if (ret) {
			if (this.applyto_bindSource("value", post_val)) {
				this._setValue(post_val);
			}
			
			if (pre_val !== post_val) {
				this._changebutton(post_val);
				this.on_fire_onchanged(this, pre_val, post_val);
			}
		}
		
		return nexacro.Component.prototype.on_fire_onclick.call(this, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);
	};
	
	
	_pToggleButton._isChecked = function (value) {
		return nexacro._toBoolean(value);
	};	
	
	_pToggleButton.on_fire_canchange = function (obj, prevalue, postvalue) {
		if (this.canchange && this.canchange._has_handlers)
		{
			var evt = new nexacro.CheckBoxChangedEventInfo(this, "canchange", prevalue, postvalue);
			return this.canchange._fireCheckEvent(this, evt);
		}
		return true;
	};
	
	_pToggleButton.on_fire_onchanged = function (obj, prevalue, postvalue) {
		if (this.onchanged && this.onchanged._has_handlers)
		{
			var evt = new nexacro.CheckBoxChangedEventInfo(this, "onchanged", prevalue, postvalue);
			return this.onchanged.fireEvent(this, evt);
		}
	};
	
	_pToggleButton._changebutton = function (postvalue) {
		var leftvalue = 0;
		this._changecolor(postvalue);
		if(postvalue) {
			leftvalue = this.form.width/2;
		}
		
		if(this.form.aniToggleBtn)
		{
			this.form.aniToggleBtn.items[0].props = "left:"+leftvalue;
			this.form.aniToggleBtn.play();
		}
	}
	
	_pToggleButton._changecolor = function (value) {
		var backgroundvalue = this.toggleOffColor;
		var bordervalue = "4px solid "+this.toggleOffColor;
		var togglebackground = this.form.staticToggleBox;
		var togglebutton = this.form.staticTogglebutton;
		
		if(value) {
			backgroundvalue = this.toggleOnColor;
			bordervalue = "4px solid "+this.toggleOnColor;
		}
		if(togglebackground) {
			togglebackground.set_background(backgroundvalue);
			togglebutton.set_border(bordervalue);		
		}
	}	
	
	_pToggleButton._setValue = function (v) {
		this.value = v;
	};	
	

	_pToggleButton.on_create_contents = function ()
	{
		nexacro._CompositeComponent.prototype.on_create_contents.call(this);
		var aniObj = new nexacro.Animation("aniToggleBtn", this);
		aniObj.set_easing("linear");
		aniObj.set_duration(300);
		this.form.addChild("aniToggleBtn", aniObj);
		this.form.aniToggleBtn.addTarget("AniItem00", this.form.staticTogglebutton, "left:0");
		this._changecolor(this.value);
		this.set_toggleType(this.toggleType);
	};	
	
	_pToggleButton.on_init_bindSource = function (columnid, propid, ds)
	{
		if (propid == "value") {
			this._setValue(this._isChecked(undefined));
			this._changebutton(this.value);
		}
	};	
	
	_pToggleButton.on_change_bindSource = function (propid, ds, row, col)
	{
		if (propid == "value") {
			this._setValue(this._isChecked(ds.getColumn(row, col)));
			this._changebutton(this.value);
		}
	};	
	
	_pToggleButton.on_getBindableProperties = function ()
	{
		return "value";
	};	

	_pToggleButton.set_toggleType = function (v)
	{
		this.toggleType = v;
		var togglebackground = this.form.staticToggleBox;
		var togglebutton = this.form.staticTogglebutton;
		if(togglebackground) {
			if(v=="rounded")
			{
				togglebackground.set_borderRadius(this.form.height+"px");
				togglebutton.set_borderRadius("50%");
			}
			else
			{
				togglebackground.set_borderRadius(undefined);
				togglebutton.set_borderRadius(undefined);
			}
		}
	};	
	

	_pToggleButton.set_toggleOnColor = function (v)
	{
		this.toggleOnColor = v;
		this._changecolor(this.value);
	};	
	

	_pToggleButton.set_toggleOffColor = function (v)
	{
		this.toggleOffColor = v;
		this._changecolor(this.value);
	};	
	
	_pToggleButton.set_value = function (v)
	{
		v = this._isChecked(v);
		if (this.value != v) {
			if (this.applyto_bindSource("value", v)) {
				this._setValue(v);
				this._changebutton(this.value);
			}
		}	
	};	
	
	/************************************************************************
	FUNCTION : _get_form_module
	DESCRIPTION :
	RETURN :
	************************************************************************/
	_pToggleButton._get_form_module = function ()
	{
		return function()
		{
			if (!this._is_form)
			return;
			
			var obj = null;
			
			this.on_create = function()
			{
				this.set_name("ToggleButton");
				this.set_titletext("ToggleButton");
				if (nexacro.Form == this.constructor)
				{
					this._setFormPosition(60,30);
				}
				
				// Object(Dataset, ExcelExportObject) Initialize
				
				
				// UI Components Initialize
				obj = new nexacro.Static("staticToggleBox","0","0","100%","100%",null,null,null,null,null,null,this);
				obj.set_taborder("0");
				obj.set_background("#CCCCCC");
				this.addChild(obj.name, obj);
				
				obj = new nexacro.Static("staticTogglebutton","0","0","50%","100%",null,null,null,null,null,null,this);
				obj.set_taborder("1");
				obj.set_background("#FFFFFF");
				obj.set_border("4px solid #CCCCCC");
				this.addChild(obj.name, obj);
				
				// Layout Functions
				//-- Default Layout : this
				obj = new nexacro.Layout("default","",60,30,this,function(p){});
				this.addLayout(obj.name, obj);
				
				// BindItem Information
				
			};
			
			this.loadPreloadList = function()
			{
				
			};
			
			// User Script
			this.registerScript("ToggleButton.xcdl", function() {
					
					this.staticToggleBox_onclick = function(obj,e)
					{
						this.parent.on_fire_onclick(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
					};
					
					this.staticTogglebutton_onclick = function(obj,e)
					{
						this.parent.on_fire_onclick(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
					};
					
				});
			
			// Regist UI Components Event
			this.on_initEvent = function()
			{
				this.staticToggleBox.addEventHandler("onclick",this.staticToggleBox_onclick,this);
				this.staticTogglebutton.addEventHandler("onclick",this.staticTogglebutton_onclick,this);
			};
			
			this.loadIncludeScript("ToggleButton.xcdl");
			this.loadPreloadList();
			
			// Remove Reference
			obj = null;
		};
	};	
	
	delete _pToggleButton;
}
